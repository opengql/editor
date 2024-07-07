import React from 'react';
import { screen } from '@testing-library/react';
import { Sidebar } from '$editor/component/sidebar';
import { routerRender } from '$editor-test/helper/router-render';

describe('Sidebar', () => {
  it('should render sidebar component with sidebar menu and versions', () => {
    routerRender(<Sidebar />);

    const sidebarElement = screen.getByTestId('ti-sidebar');
    expect(sidebarElement).toBeInTheDocument();

    const sidebarMenuElement = screen.getByTestId('ti-sidebar-menu');
    expect(sidebarMenuElement).toBeInTheDocument();

    const versionsElement = screen.getByTestId('ti-versions');
    expect(versionsElement).toBeInTheDocument();
  });
});
