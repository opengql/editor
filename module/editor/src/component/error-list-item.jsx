import React from 'react';
import css from './style/error-list-item.module.css';
import PropTypes from 'prop-types';
import { ParsingError } from '../type/parsing-error';

export const ErrorListItem = ({ error, errorIndex }) => (
  <li
    key={`code-error-${errorIndex}`}
    className={css.errorListElement}
    data-testid={`ti-parsing-status-errors--errors-list-element-${errorIndex}`}
  >
    {`[line ${error.lineIndex}:${error.charPosition}] ${error.message}`}
  </li>
);

ErrorListItem.propTypes = {
  errorIndex: PropTypes.number.isRequired,
  error: ParsingError.isRequired,
};
