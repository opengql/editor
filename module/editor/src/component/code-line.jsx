import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import css from '$editor/component/style/code-line.module.css';

/***
 * Component that renders single line in the code block.
 * There are two style options of such code line.
 * First style is normal line and the second is a line that contains error.
 * The one that contains error has different background color.
 *
 * @param {string} line
 * @param {number} index
 * @param {boolean} hasError
 * @returns {JSX.Element}
 * @constructor
 */
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
