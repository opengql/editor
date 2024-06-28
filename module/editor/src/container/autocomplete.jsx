import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from '$editor/container/style/autocomplete.module.css';
import { useDispatch } from 'react-redux';
import { useStringUtil } from '$editor/hook/string-util';
import { useSuggestionUtil } from '$editor/hook/suggestion-util';
import { AutocompleteOption } from '$editor/component/autocomplete-option';
import { editorActions } from '$editor/store/slice/editor-slice';
import { useEditorTextArea } from '$editor/hook/editor-text-area';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';
import { useCaretIndex, useCaretPosition } from '$editor/store/hook/caret-data';
import { useEditorValue } from '$editor/store/hook/editor';
import { useLanguageCurrentGrammar } from '$editor/store/hook/language';

/***
 * Container that implements autocompletion rendering used by the code editor.
 * It contains all necessary information needed to provide changes to the application state.
 * As container its also perform this changes by dispatcher.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Autocomplete = () => {
  const caretPosition = useCaretPosition();
  const caretIndex = useCaretIndex();
  const editorValue = useEditorValue();
  const { grammarDefinition } = useLanguageCurrentGrammar();
  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [lastWord, setLastWord] = useState(undefined);
  const [lastWordData, setLastWordData] = useState(undefined);

  const suggestionUtil = useSuggestionUtil();
  const stringUtil = useStringUtil();
  const editorTextArea = useEditorTextArea();

  const optionsRef = useRef(null);

  const resetAutocompleteData = () => {
    setLastWordData(undefined);
    setSelectedOption(-1);
    setShouldShowModal(false);
  };

  const handleSuggestionAccept = useCallback(
    (index) => {
      const suggestion = suggestions[index];

      if (suggestion === undefined) {
        return;
      }

      let tmpValue = editorValue;
      let shouldAddOneIndex;

      if (lastWordData.startIndex !== -1) {
        const before = tmpValue.substring(0, lastWordData.startIndex);
        const after = tmpValue.substring(lastWordData.startIndex + lastWordData.length);
        const isAfterStartingWithSpace = after.startsWith(' ');
        tmpValue = isAfterStartingWithSpace ? `${before}${suggestion}${after}` : `${before}${suggestion} ${after}`;
        shouldAddOneIndex = !isAfterStartingWithSpace;
      }

      dispatch(editorActions.setValue(tmpValue));

      const newIndexBase = lastWordData.startIndex + suggestion.length;
      const newIndex = shouldAddOneIndex ? newIndexBase + 1 : newIndexBase;

      dispatch(caretDataActions.update({ selectionStart: newIndex, value: editorTextArea.value }));
      dispatch(caretDataActions.updateNextIndex(newIndex));

      resetAutocompleteData();
      editorTextArea?.focus();
    },
    [suggestions, editorValue],
  );

  const getModalStyles = useCallback(() => {
    const rect = editorTextArea?.getBoundingClientRect();
    const { top, left } = rect ?? { top: 0, left: 0 };

    return {
      top: `calc(${top + caretPosition.x * 20}px + 5px)`,
      left: `calc(${left + caretPosition.y * 7.2}px + 50px)`,
    };
  }, [editorTextArea, caretPosition]);

  const handleEnterKey = useCallback(
    (event) => {
      event.preventDefault();
      handleSuggestionAccept(selectedOption);
    },
    [selectedOption, handleSuggestionAccept],
  );

  const handleUpKey = useCallback(
    (event) => {
      event.preventDefault();

      let newSelectedOption = selectedOption - 1;

      if (newSelectedOption < 0) {
        newSelectedOption = suggestions.length - 1;
      }

      setSelectedOption(newSelectedOption);
    },
    [selectedOption, suggestions],
  );

  const handleDownKey = useCallback(
    (event) => {
      event.preventDefault();

      let newSelectedOption = selectedOption + 1;

      if (newSelectedOption > suggestions.length - 1) {
        newSelectedOption = 0;
      }

      setSelectedOption(newSelectedOption);
    },
    [selectedOption, suggestions],
  );

  const handleEscapeKey = useCallback(
    (event) => {
      event.preventDefault();
      setShouldShowModal(false);
      editorTextArea?.focus();
    },
    [editorTextArea],
  );

  const handleCtrlEnterKey = useCallback(
    (event) => {
      event.preventDefault();
      setShouldShowModal(suggestions.length !== 0);
    },
    [suggestions],
  );

  const handleKeyDownEvent = useCallback(
    (event) => {
      if (shouldShowModal) {
        if (event.key === 'Enter') {
          handleEnterKey(event);
        }

        if (event.key === 'ArrowUp') {
          handleUpKey(event);
        }

        if (event.key === 'ArrowDown') {
          handleDownKey(event);
        }

        if (event.key === 'Escape') {
          handleEscapeKey(event);
        }
      } else {
        if (event.ctrlKey && event.key === 'Enter') {
          handleCtrlEnterKey(event);
        }
      }
    },
    [shouldShowModal, handleEnterKey, handleUpKey, handleDownKey, handleEscapeKey, handleCtrlEnterKey],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [shouldShowModal, handleKeyDownEvent]);

  useEffect(() => {
    if (lastWordData !== undefined && lastWordData.length > 1) {
      return;
    }

    setSuggestions([]);
    setShouldShowModal(false);
  }, [lastWordData]);

  useEffect(() => {
    const { word, wordData } = stringUtil.getInputWordDataFromSelectionStart(editorValue, caretIndex);
    setLastWordData(wordData);
    setLastWord(word);
  }, [editorValue, caretIndex]);

  useEffect(() => {
    if (lastWord === undefined || lastWord.length <= 1 || lastWordData === undefined) {
      return;
    }

    const { keywords } = grammarDefinition;

    setSuggestions([]);
    setShouldShowModal(false);

    const tmpSuggestions = suggestionUtil
      .getSimilarWords(lastWord, keywords)
      .map((suggestion) => suggestion.word)
      .filter((suggestion) => suggestion !== lastWord);

    setSuggestions(tmpSuggestions);
    setSelectedOption(tmpSuggestions.length !== 0 ? 0 : -1);
    setShouldShowModal(tmpSuggestions.length !== 0);
  }, [grammarDefinition, lastWord, lastWordData]);

  return (
    <div
      hidden={!shouldShowModal}
      className={css.autocompleteModal}
      style={getModalStyles()}
      data-testid="ti-autocomplete-modal"
    >
      <ul className={css.autocompleteModalList} ref={optionsRef} data-testid="ti-autocomplete-list">
        {suggestions.map((suggestion, index) => (
          <AutocompleteOption
            key={`autocomplete-option-${index}`}
            index={index}
            value={suggestion}
            selectedIndex={selectedOption}
            onOptionClick={handleSuggestionAccept}
          />
        ))}
      </ul>
    </div>
  );
};
