import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import { AppContainer } from '$editor/component/app-container.jsx';
import { routerRender } from '$editor-test/helper/router-render';

describe('AppContainer', () => {
  it('should render AppContainer component with children', () => {
    const mockChild = <div data-testid="mock-child">Mock Child</div>;

    routerRender(<AppContainer>{mockChild}</AppContainer>);

    const appContainerElement = screen.getByTestId('app-container');

    expect(appContainerElement).toBeInTheDocument();

    const sidebarElement = screen.getByTestId('ti-sidebar');

    expect(sidebarElement).toBeInTheDocument();

    const mainContentElement = screen.getByTestId('ti-main-content');

    expect(mainContentElement).toBeInTheDocument();
    expect(mainContentElement).toHaveTextContent('Mock Child');
  });
});
