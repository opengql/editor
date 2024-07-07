import React, { useEffect, useState } from 'react';
import css from '$editor/component/style/sidebar-menu-item.module.css';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

/***
 * Component that renders single button in side menu.
 * Its main responsibility is to bring the ability to move over the application.
 *
 * @param {string} path
 * @param {JSX.Element} icon
 * @param {string} label
 * @param {string} testId
 * @returns {JSX.Element}
 * @constructor
 */
export const SidebarMenuItem = ({ path, icon, label, testId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  const handleOnClick = (event) => {
    navigate(path);
    event.preventDefault();
  };

  useEffect(() => {
    setIsSelected(location.pathname === path);
  }, [location, path]);

  return (
    <li
      className={`${css.sidebarMenuItem} ${isSelected ? css.sidebarMenuItemSelected : ''}`}
      onClick={handleOnClick}
      data-testid={testId}
    >
      {icon}
      <div className={css.sidebarMenuItemLabel}>{label}</div>
    </li>
  );
};

SidebarMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};
