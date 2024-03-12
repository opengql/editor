import React from 'react';
import css from './style/sidebar-menu.module.css';
import { SidebarMenuItem } from './sidebar-menu-item';
import { EditorIcon } from '../icon/editor-icon';
import { ExamplesIcon } from '../icon/examples-icon';

export const SidebarMenu = () => (
  <ul className={css.sidebarMenu} data-testid="ti-sidebar-menu">
    <SidebarMenuItem path={'/'} label={'Editor'} icon={<EditorIcon />} testId="ti-editor-page-button" />
    <SidebarMenuItem path={'/examples'} label={'Examples'} icon={<ExamplesIcon />} testId="ti-examples-page-button" />
  </ul>
);
