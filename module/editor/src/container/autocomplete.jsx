import React, { useCallback, useEffect, useRef, useState } from 'react';
import css from './style/autocomplete.module.css';
import PropTypes from 'prop-types';
import { CaretData, defaultCaretData } from '../type/caret-data';
import { useDebouncedEffect } from '../hook/debounced-effect';
import { connect } from 'react-redux';

const AutocompleteImpl = ({ caretData, code, keywords, textAreaElement, onSuggestionAccept }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [wordData, setWordData] = useState({ startIndex: 0, length: 0 });
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [shouldSkipNextChange, setShouldSkipNextChange] = useState(false);
  const optionsRef = useRef(null);

  const handleOptionClick = (index) => {
    onSuggestionAccept(suggestions[index], wordData);
    setShouldSkipNextChange(true);
    textAreaElement?.focus();
  };

  const assemblyOption = (value, index) => {
    const isSelectedClass = selectedOption === index ? css.autocompleteModalSelectedElement : '';

    return (
      <li
        className={`${css.autocompleteModalElement} ${isSelectedClass}`}
        key={`autocomplete-option-${index}`}
        data-testid={`ti-autocomplete-option-${index}`}
        onClick={() => handleOptionClick(index)}
      >
        {value}
      </li>
    );
  };

  const isWhiteSpace = (char) => /[\s \r\n]/.test(char);

  const getWordBackwards = (input, startIndex) => {
    let word = '';
    let lastIndex = startIndex;

    for (let i = startIndex - 1; i >= 0; i--) {
      if (isWhiteSpace(input[i])) {
        break;
      }

      word = input[i] + word;
      lastIndex = i;
    }

    const wordData = {
      startIndex: lastIndex,
      length: startIndex - lastIndex,
    };

    return { word, wordData };
  };

  const calculateAccuracy = (word1, word2) => {
    const word1Upper = word1.toUpperCase();
    const word2Upper = word2.toUpperCase();

    if (word1.length > word2.length && word1Upper.startsWith(word2Upper)) {
      return (word2.length / word1.length) * 2;
    }

    const set1 = new Set(word1Upper);
    const set2 = new Set(word2Upper);
    const intersection = new Set([...set1].filter((char) => set2.has(char)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  };

  const assemblySuggestionForWords = (word1, word2) => ({
    word: word2,
    accuracy: calculateAccuracy(word2, word1),
  });

  const findSimilarWords = (inputWord, wordsList) =>
    wordsList
      .map((word) => assemblySuggestionForWords(inputWord, word))
      .sort((a, b) => b.accuracy - a.accuracy)
      .filter((suggestion) => suggestion.accuracy > 0.6);

  useDebouncedEffect(
    () => {
      setSuggestions([]);
      setShouldShowModal(false);

      if (shouldSkipNextChange) {
        setShouldSkipNextChange(false);
        setWordData(undefined);
        return;
      }

      const { word, wordData } = getWordBackwards(code, caretData.index);

      if (word.length <= 1) {
        return;
      }

      const suggestions = findSimilarWords(word, keywords).map((suggestion) => suggestion.word);
      setSuggestions(suggestions);
      setSelectedOption(suggestions.length !== 0 ? 0 : -1);
      setWordData(wordData);
      setShouldShowModal(suggestions.length !== 0);
    },
    {
      deps: [caretData, keywords, code],
    },
  );

  const handleEnterKey = useCallback(
    (event) => {
      event.preventDefault();
      onSuggestionAccept(suggestions[selectedOption], wordData);
      setShouldSkipNextChange(true);
    },
    [suggestions, wordData, selectedOption],
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

  const handleEscapeKey = useCallback(
    (event) => {
      event.preventDefault();
      setShouldShowModal(false);
    },
    [selectedOption],
  );

  const handleCtrlEnterKey = useCallback(
    (event) => {
      event.preventDefault();
      setShouldShowModal(suggestions.length !== 0);
    },
    [selectedOption],
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
    [shouldShowModal, handleEnterKey, handleUpKey, handleDownKey],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEvent);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEvent);
    };
  }, [shouldShowModal, handleKeyDownEvent]);

  useEffect(() => {
    if (wordData !== undefined) {
      return;
    }

    setSuggestions([]);
  }, [wordData]);

  const getOptions = () => suggestions.map((suggestion, index) => assemblyOption(suggestion, index));

  const getTextAreaTop = () => textAreaElement?.getBoundingClientRect().top ?? 0;

  const getTextAreaLeft = () => textAreaElement?.getBoundingClientRect().left ?? 0;

  const getModalStyles = () => ({
    top: `calc(${getTextAreaTop() + caretData.position.x * 20}px + 10px)`,
    left: `calc(${getTextAreaLeft() + caretData.position.y * 7.2}px + 60px)`,
  });

  return (
    <div
      hidden={!shouldShowModal}
      className={css.autocompleteModal}
      style={getModalStyles()}
      data-testid="ti-autocomplete-modal"
    >
      <ul className={css.autocompleteModalList} ref={optionsRef} data-testid="ti-autocomplete-list">
        {getOptions()}
      </ul>
    </div>
  );
};

AutocompleteImpl.propTypes = {
  caretData: CaretData,
  code: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  textAreaElement: PropTypes.element,
  onSuggestionAccept: PropTypes.func,
};

AutocompleteImpl.defaultProps = {
  caretData: defaultCaretData,
};

const mapStateToProps = (state) => ({
  caretData: {
    position: state.caretData.position,
    index: state.caretData.index,
  },
  code: state.editor.value,
  keywords: state.language.grammarDefinition?.keywords ?? [],
});

export const Autocomplete = connect(mapStateToProps)(AutocompleteImpl);
