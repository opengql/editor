import React from 'react';
import PropTypes from 'prop-types';
import css from '$editor/component/style/caret-data.module.css';

/***
 * Component that displays the current position of caret in code editor.
 *
 * @param {CaretPosition} [position = { x: 0, y: 0 }]
 * @returns {JSX.Element}
 * @constructor
 */
export const CaretData = ({ position = { x: 0, y: 0 } }) => (
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
