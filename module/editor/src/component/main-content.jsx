import React from 'react';
import css from './style/main-content.module.css';
import PropTypes from 'prop-types';

export const MainContent = ({ children }) => <div className={css.mainContent}>{children}</div>;

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
};
