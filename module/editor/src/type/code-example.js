import PropTypes from 'prop-types';

export const CodeExample = PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});
