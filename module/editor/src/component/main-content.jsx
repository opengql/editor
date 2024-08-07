import React from 'react';
import css from '$editor/component/style/main-content.module.css';
import PropTypes from 'prop-types';

/***
 * Component that provides basic content overlap with styling.
 *
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 * @constructor
 */
export const MainContent = ({ children }) => {
  if (children === undefined) {
    throw new Error('MainContent element needs to have children element.');
  }

  return (
    <div className={css.mainContent} data-testid="ti-main-content">
      {children}
    </div>
  );
};

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
};
