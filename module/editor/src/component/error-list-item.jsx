import React from 'react';
import css from './style/error-list-item.module.css';
import PropTypes from 'prop-types';
import { ParsingError } from '../type/parsing-error';

export const ErrorListItem = ({ error, errorIndex }) => {
  const handleClick = () => {
    const textArea = document.getElementById('code-textarea--input');
    const lineIndex = error.lineIndex - 1;
    const lines = textArea.value.split('\n');

    const sumOfPrevLines = lines
      .filter((_, currentLineIndex) => currentLineIndex < lineIndex)
      .map((line) => (line !== '' ? line.length : 1))
      .reduce((sum, nextLineLength) => sum + nextLineLength, 0);

    const index = sumOfPrevLines + error.charPosition;

    textArea.setSelectionRange(index, index);
    textArea.focus();
  };

  return (
    <li
      key={`code-error-${errorIndex}`}
      className={css.errorListElement}
      data-testid={`ti-parsing-status-errors--errors-list-element-${errorIndex}`}
      onClick={handleClick}
    >
      <div className={css.errorPositionLabel}>{`error at ${error.lineIndex}:${error.charPosition}`}</div>
      <div className={css.errorMessage}>{error.message}</div>
    </li>
  );
};

ErrorListItem.propTypes = {
  errorIndex: PropTypes.number.isRequired,
  error: ParsingError.isRequired,
};
