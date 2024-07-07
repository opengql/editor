import React from 'react';
import css from '$editor/component/style/sidebar-menu.module.css';
import { SidebarMenuItem } from '$editor/component/sidebar-menu-item';
import { EditorIcon } from '$editor/icon/editor-icon';
import { ExamplesIcon } from '$editor/icon/examples-icon';

/***
 * Group of buttons that is responsible for navigation between pages of the application.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const SidebarMenu = () => (
  <ul className={css.sidebarMenu} data-testid="ti-sidebar-menu">
    <SidebarMenuItem path={'/'} label={'Editor'} icon={<EditorIcon />} testId="ti-editor-page-button" />
    <SidebarMenuItem path={'/examples'} label={'Examples'} icon={<ExamplesIcon />} testId="ti-examples-page-button" />
  </ul>
);
