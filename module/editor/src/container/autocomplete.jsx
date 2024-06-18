import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from '$editor/container/style/autocomplete.module.css';
import PropTypes from 'prop-types';
import { CaretData } from '$editor/type/caret-data';
import { connect } from 'react-redux';
import { useStringUtil } from '$editor/hook/string-util';
import { useSuggestionUtil } from '$editor/hook/suggestion-util';
import { AutocompleteOption } from '$editor/component/autocomplete-option';
import { editorActions } from '$editor/store/slice/editor-slice';
import { useEditorTextArea } from '$editor/hook/editor-text-area';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';

const AutocompleteImpl = ({
  caretData,
  editorValue,
  keywords,
  onEditorValueChange,
  onUpdateCaretData,
  updateNextCaretIndex,
}) => {
  const suggestionUtil = useSuggestionUtil();
  const stringUtil = useStringUtil();
  const editorTextArea = useEditorTextArea();

  const [suggestions, setSuggestions] = useState([]);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [lastWord, setLastWord] = useState(undefined);
  const [lastWordData, setLastWordData] = useState(undefined);

  const optionsRef = useRef(null);

  const resetAutocompleteData = () => {
    setLastWordData(undefined);
    setSelectedOption(-1);
    setShouldShowModal(false);
  };

  const handleSuggestionAccept = useCallback(
    (index) => {
      const suggestion = suggestions[index];

      let tmpValue = editorValue;
      let shouldAddOneIndex;

      if (lastWordData.startIndex !== -1) {
        const before = tmpValue.substring(0, lastWordData.startIndex);
        const after = tmpValue.substring(lastWordData.startIndex + lastWordData.length);
        const isAfterStartingWithSpace = after.startsWith(' ');
        tmpValue = isAfterStartingWithSpace ? `${before}${suggestion}${after}` : `${before}${suggestion} ${after}`;
        shouldAddOneIndex = !isAfterStartingWithSpace;
      }

      onEditorValueChange(tmpValue);

      const newIndexBase = lastWordData.startIndex + suggestion.length;
      const newIndex = shouldAddOneIndex ? newIndexBase + 1 : newIndexBase;
      onUpdateCaretData(newIndex, editorTextArea.value);
      updateNextCaretIndex(newIndex);

      resetAutocompleteData();
      editorTextArea?.focus();
    },
    [editorValue, suggestions, lastWordData],
  );

  const getModalStyles = useCallback(() => {
    const rect = editorTextArea?.getBoundingClientRect();
    const { top, left } = rect ?? { top: 0, left: 0 };

    return {
      top: `calc(${top + caretData.position.x * 20}px + 5px)`,
      left: `calc(${left + caretData.position.y * 7.2}px + 50px)`,
    };
  }, [editorTextArea, caretData]);

  const handleEnterKey = useCallback(
    (event) => {
      event.preventDefault();
      handleSuggestionAccept(selectedOption);
    },
    [selectedOption],
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
    [selectedOption],
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
    [selectedOption],
  );

  const handleEscapeKey = (event) => {
    event.preventDefault();
    setShouldShowModal(false);
    editorTextArea?.focus();
  };

  const handleCtrlEnterKey = (event) => {
    event.preventDefault();
    setShouldShowModal(suggestions.length !== 0);
  };

  const handleKeyDownEvent = (event) => {
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
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [shouldShowModal, handleKeyDownEvent]);

  useEffect(() => {
    if (lastWordData !== undefined) {
      return;
    }

    setSuggestions([]);
  }, [lastWordData]);

  useEffect(() => {
    const { word, wordData } = stringUtil.getInputWordDataFromSelectionStart(editorValue, caretData.index);
    setLastWordData(wordData);
    setLastWord(word);
  }, [editorValue, caretData]);

  useEffect(() => {
    if (lastWord === undefined || lastWord.length <= 1 || lastWordData === undefined) {
      return;
    }

    setSuggestions([]);
    setShouldShowModal(false);

    const tmpSuggestions = suggestionUtil
      .getSimilarWords(lastWord, keywords)
      .map((suggestion) => suggestion.word)
      .filter((suggestion) => suggestion !== lastWord);

    setSuggestions(tmpSuggestions);
    setSelectedOption(tmpSuggestions.length !== 0 ? 0 : -1);
    setShouldShowModal(tmpSuggestions.length !== 0);
  }, [keywords, lastWord, lastWordData]);

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

AutocompleteImpl.propTypes = {
  caretData: CaretData.isRequired,
  editorValue: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEditorValueChange: PropTypes.func.isRequired,
  onUpdateCaretData: PropTypes.func.isRequired,
  updateNextCaretIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  caretData: {
    position: state.caretData.position,
    index: state.caretData.index,
  },
  editorValue: state.editor.value,
  keywords: state.language.grammars[state.language.selectedGrammar].grammarDefinition?.keywords ?? [],
});

const mapDispatchToProps = (dispatch) => ({
  onEditorValueChange: (value) => dispatch(editorActions.setValue(value)),
  onUpdateCaretData: (selectionStart, value) => dispatch(caretDataActions.update({ selectionStart, value })),
  updateNextCaretIndex: (nextCaretIndex) => dispatch(caretDataActions.updateNextIndex(nextCaretIndex)),
});

export const Autocomplete = connect(mapStateToProps, mapDispatchToProps)(AutocompleteImpl);
