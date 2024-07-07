import React from 'react';
import css from '$editor/component/style/button-group.module.css';
import PropTypes from 'prop-types';

/***
 * Component that handles styling for group of buttons.
 * Children should be {@link Button}.
 *
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export const ButtonGroup = ({ children }) => (
  <div className={css.buttonGroup} data-testid="ti-btn-group">
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
