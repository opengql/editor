import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SidebarMenuItem } from '../../src/component/sidebar-menu-item';
import { routerRender } from '../helper/router-render';

describe('SidebarMenuItem', () => {
  const mockPath = '/';
  const mockIcon = <div data-testid="ti-mock-icon">Icon</div>;
  const mockLabel = 'Editor';
  const mockTestId = 'ti-editor-page-button';

  it('should render with provided path and icon and label', () => {
    routerRender(<SidebarMenuItem path={mockPath} icon={mockIcon} label={mockLabel} testId={mockTestId} />);

    const sidebarMenuItemElement = screen.getByTestId(mockTestId);
    expect(sidebarMenuItemElement).toBeInTheDocument();
    expect(sidebarMenuItemElement).toHaveTextContent(mockLabel);

    const iconElement = screen.getByTestId('ti-mock-icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent('Icon');
  });

  it('should add class if current path is equals to component class', () => {
    const initialEntries = ['/', '/examples'];

    const { rerender } = routerRender(
      <SidebarMenuItem path={initialEntries[0]} icon={mockIcon} label={mockLabel} testId={mockTestId} />,
    );

    const sidebarMenuItemElement1 = screen.getByTestId(mockTestId);
    expect(sidebarMenuItemElement1).toHaveClass('sidebarMenuItemSelected');

    rerender(<SidebarMenuItem path={initialEntries[1]} icon={mockIcon} label={mockLabel} testId={mockTestId} />);

    const sidebarMenuItemElement2 = screen.getByTestId(mockTestId);
    expect(sidebarMenuItemElement2).not.toHaveClass('sidebarMenuItemSelected');
  });

  it('should navigate to the specified path on click', () => {
    routerRender(<SidebarMenuItem path={mockPath} icon={mockIcon} label={mockLabel} testId={mockTestId} />, {
      init: 1,
    });

    const sidebarMenuItemElement = screen.getByTestId(mockTestId);

    expect(sidebarMenuItemElement).not.toHaveClass('sidebarMenuItemSelected');

    act(() => fireEvent.click(sidebarMenuItemElement));

    expect(sidebarMenuItemElement).toHaveClass('sidebarMenuItemSelected');
  });
});
