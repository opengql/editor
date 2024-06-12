import React from 'react';
import css from '$editor/component/style/app-container.module.css';
import { Sidebar } from '$editor/component/sidebar';
import { MainContent } from '$editor/component/main-content';
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
