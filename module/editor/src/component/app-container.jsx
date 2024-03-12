import React from 'react';
import css from './style/app-container.module.css';
import { Sidebar } from './sidebar';
import { MainContent } from './main-content';
import PropTypes from 'prop-types';

export const AppContainer = ({ children }) => (
  <div className={css.appContainer} data-testid="app-container">
    <Sidebar />
    <MainContent>{children}</MainContent>
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
