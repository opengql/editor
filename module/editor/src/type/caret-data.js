import PropTypes from 'prop-types';

export const CaretPosition = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
});

export const CaretData = PropTypes.shape({
  position: CaretPosition.isRequired,
  index: PropTypes.number.isRequired,
});

export const defaultCaretData = {
  position: {
    x: 0,
    y: 0,
  },
  index: 0,
};
