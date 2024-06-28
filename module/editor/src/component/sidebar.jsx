import React from 'react';
import css from '$editor/component/style/sidebar.module.css';
import { SidebarMenu } from '$editor/component/sidebar-menu';
import { Versions } from '$editor/component/versions';
// import { WorkerSelect } from '$editor/container/grammar-select';
import { ColorModeSwitch } from '$editor/container/color-mode-switch';

/***
 * Component that renders the base of the sidebar of the application.
 * It brings basic styling that are used in each application page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Sidebar = () => (
  <div className={css.sidebar} data-testid="ti-sidebar">
    {/* <WorkerSelect /> */}
    <SidebarMenu />
    <div style={{ flex: 1 }}></div>
    <ColorModeSwitch />
    <Versions />
  </div>
);
