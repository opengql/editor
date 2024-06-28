import PropTypes from 'prop-types';

/***
 * @typedef {import('$editor/type/parse-error.js').ParseError} ParseError
 */

/***
 * Object that represents {@link ParseError} in form of react prop-types.
 * As the {@link ParseError} it contains three properties as described in source type.
 */
export const ParseErrorShape = PropTypes.shape({
  lineIndex: PropTypes.number.isRequired,
  charPosition: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
});
