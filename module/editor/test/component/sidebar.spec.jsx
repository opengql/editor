import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../../src/component/sidebar';
import { routerRender } from '../helper/router-render';

describe('Sidebar component', () => {
  it('renders Sidebar component with SidebarMenu and Versions', () => {
    routerRender(<Sidebar />);

    const sidebarElement = screen.getByTestId('ti-sidebar');
    expect(sidebarElement).toBeInTheDocument();

    const sidebarMenuElement = screen.getByTestId('ti-sidebar-menu');
    expect(sidebarMenuElement).toBeInTheDocument();

    const versionsElement = screen.getByTestId('ti-versions');
    expect(versionsElement).toBeInTheDocument();
  });
});
