import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarMenu } from '../../src/component/sidebar-menu';
import { routerRender, routerWithPathsRender } from '../helper/router-render';

describe('SidebarMenu component', () => {
  it('renders SidebarMenu component with SidebarMenuItem components', () => {
    routerRender(<SidebarMenu />);

    const sidebarMenuElement = screen.getByTestId('ti-sidebar-menu');
    expect(sidebarMenuElement).toBeInTheDocument();

    const editorMenuItem = screen.getByTestId('ti-editor-page-button');
    expect(editorMenuItem).toBeInTheDocument();
    expect(editorMenuItem).toHaveTextContent('Editor');

    const examplesMenuItem = screen.getByTestId('ti-examples-page-button');
    expect(examplesMenuItem).toBeInTheDocument();
    expect(examplesMenuItem).toHaveTextContent('Examples');
  });

  it('should move to explicit path after clicking SidebarMenuItem', () => {
    const paths = ['/', '/examples'];

    routerWithPathsRender(<SidebarMenu />, paths);

    const pageHeader1 = screen.getByTestId('ti-header');
    expect(pageHeader1.innerHTML).toBe(paths[0]);

    const sidebarExamplesButton = screen.getByTestId('ti-examples-page-button');
    sidebarExamplesButton.click();

    const pageHeader2 = screen.getByTestId('ti-header');
    expect(pageHeader2.innerHTML).toBe(paths[1]);

    const sidebarEditorButton = screen.getByTestId('ti-editor-page-button');
    sidebarEditorButton.click();

    const pageHeader3 = screen.getByTestId('ti-header');
    expect(pageHeader3.innerHTML).toBe(paths[0]);
  });
});
