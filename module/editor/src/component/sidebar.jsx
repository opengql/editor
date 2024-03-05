import React from 'react';
import css from './style/sidebar.module.css';
import { SidebarMenu } from './sidebar-menu';
import { Versions } from './versions';

export const Sidebar = () => (
  <div className={css.sidebar}>
    <SidebarMenu />
    <div style={{ flex: 1 }}></div>
    <Versions />
  </div>
);
