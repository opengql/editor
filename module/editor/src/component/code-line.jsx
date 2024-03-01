import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import css from './style/code-line.module.css';

export const CodeLine = ({ line, index, hasError }) => (
  <tr
    key={`code-line-${index}`}
    className={hasError ? css.codeLineError : undefined}
    data-testid={hasError ? 'ti-higlights-code-line-error' : 'ti-higlights-code-line'}
  >
    <td className={css.lineNumberCell} data-testid="ti-higlights-code-line--number-cell">
      {index + 1}
    </td>
    <td className={css.codeLine} data-testid="ti-higlights-code-line--code-cell">
      {parse(line)}
    </td>
  </tr>
);

CodeLine.propTypes = {
  line: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  hasError: PropTypes.bool,
};
