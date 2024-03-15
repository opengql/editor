import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarMenu } from '../../src/component/sidebar-menu';
import { routerRender } from '../helper/router-render';

describe('SidebarMenu', () => {
  it('should render sidebar menu component with SidebarMenuItem components', () => {
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
    routerRender(<SidebarMenu />);

    const sidebarEditorButton = screen.getByTestId('ti-editor-page-button');
    const sidebarExamplesButton = screen.getByTestId('ti-examples-page-button');

    expect(sidebarEditorButton).toHaveClass('sidebarMenuItemSelected');

    act(() => fireEvent.click(sidebarExamplesButton));

    expect(sidebarExamplesButton).toHaveClass('sidebarMenuItemSelected');

    act(() => fireEvent.click(sidebarEditorButton));

    expect(sidebarEditorButton).toHaveClass('sidebarMenuItemSelected');
  });
});
