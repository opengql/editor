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

const AutocompleteImpl = ({ caretData, editorValue, keywords, onEditorValueChange, onUpdateCaretData }) => {
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

  const handleSuggestionAccept = (index) => {
    const suggestion = suggestions[index];
    const suggestionWordData = { ...lastWordData, length: suggestion.length };

    let tmpValue = editorValue;

    if (suggestionWordData.startIndex !== -1) {
      const before = tmpValue.substring(0, suggestionWordData.startIndex);
      const after = tmpValue.substring(suggestionWordData.startIndex + suggestionWordData.length);
      tmpValue = `${before}${suggestion} ${after}`;
    }

    onEditorValueChange(tmpValue);

    const newIndex = suggestionWordData.startIndex + suggestion.length + 1;
    editorTextArea.setSelectionRange(newIndex, newIndex);
    onUpdateCaretData(newIndex, editorTextArea.value);

    resetAutocompleteData();
    editorTextArea?.focus();
  };

  const getModalStyles = useCallback(() => {
    const rect = editorTextArea?.getBoundingClientRect();
    const { top, left } = rect ?? { top: 0, left: 0 };

    return {
      top: `calc(${top + caretData.position.x * 20}px + 5px)`,
      left: `calc(${left + caretData.position.y * 7.2}px + 50px)`,
    };
  }, [editorTextArea, caretData]);

  const handleEnterKey = (event) => {
    event.preventDefault();
    handleSuggestionAccept(selectedOption);
  };

  const handleUpKey = (event) => {
    event.preventDefault();

    let newSelectedOption = selectedOption - 1;

    if (newSelectedOption < 0) {
      newSelectedOption = suggestions.length - 1;
    }

    setSelectedOption(newSelectedOption);
  };

  const handleDownKey = (event) => {
    event.preventDefault();

    let newSelectedOption = selectedOption + 1;

    if (newSelectedOption > suggestions.length - 1) {
      newSelectedOption = 0;
    }

    setSelectedOption(newSelectedOption);
  };

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
    const { word, wordData } = stringUtil.getLastWordByIndex(editorValue, caretData.index);
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
});

export const Autocomplete = connect(mapStateToProps, mapDispatchToProps)(AutocompleteImpl);
