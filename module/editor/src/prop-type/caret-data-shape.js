import PropTypes from 'prop-types';

/***
 * Defines the shape of {@link CaretPosition} in the React prop-types.
 */
export const CaretPositionShape = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

/***
 * Defines the shape of {@link CaretData} in the React prop-types.
 */
export const CaretDataShape = PropTypes.shape({
  position: CaretPositionShape.isRequired,
  index: PropTypes.number.isRequired,
});

export const defaultCaretDataShape = {
  position: {
    x: 0,
    y: 0,
  },
  index: 0,
};
