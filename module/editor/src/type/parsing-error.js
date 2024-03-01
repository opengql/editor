import PropTypes from 'prop-types';

export const ParsingError = PropTypes.shape({
  lineIndex: PropTypes.number.isRequired,
  charPosition: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
});
