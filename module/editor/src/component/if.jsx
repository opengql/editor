import React from 'react';
import PropTypes from 'prop-types';

export const If = ({ condition, children }) => (condition ? children : <></>);

If.propTypes = {
  condition: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
