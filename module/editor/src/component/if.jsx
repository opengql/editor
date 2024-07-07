import React from 'react';
import PropTypes from 'prop-types';

/***
 * Component that render conditionally passed child.
 *
 * @param {boolean} condition
 * @param {JSX.Element} children
 * @returns {*|JSX.Element}
 * @constructor
 */
export const If = ({ condition, children }) => (condition ? children : <></>);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
