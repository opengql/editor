import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContainer } from '../../src/component/app-container';
import { routerRender } from '../helper/router-render';

describe('AppContainer', () => {
  it('renders AppContainer component with children', () => {
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
