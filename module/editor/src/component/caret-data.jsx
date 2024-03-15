import React from 'react';
import PropTypes from 'prop-types';
import css from './style/caret-data.module.css';

export const CaretData = ({ position }) => (
  <div className={css.caretDataWrapper} data-testid="ti-caret-data">
    {position.x}:{position.y}
  </div>
);

CaretData.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

CaretData.defaultProps = {
  position: {
    x: 0,
    y: 0,
  },
};
