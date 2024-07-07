import PropTypes from 'prop-types';

/**
 * Defines the shape of a {@link CodeExample} type
 */
export const CodeExampleShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
});
