import React, { useEffect, useState } from 'react';
import css from './style/sidebar-menu-item.module.css';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

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
