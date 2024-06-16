import React from 'react';
import css from '$editor/component/style/sidebar.module.css';
import { SidebarMenu } from '$editor/component/sidebar-menu';
import { Versions } from '$editor/component/versions';
// import { WorkerSelect } from '$editor/container/grammar-select';

export const Sidebar = () => (
  <div className={css.sidebar} data-testid="ti-sidebar">
    {/* <WorkerSelect /> */}
    <SidebarMenu />
    <div style={{ flex: 1 }}></div>
    <Versions />
  </div>
);
