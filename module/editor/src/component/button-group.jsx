import React from 'react';
import css from '$editor/component/style/button-group.module.css';
import PropTypes from 'prop-types';

export const ButtonGroup = ({ children }) => (
  <div className={css.buttonGroup} data-testid="ti-btn-group">
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
