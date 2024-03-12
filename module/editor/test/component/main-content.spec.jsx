import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainContent } from '../../src/component/main-content';

describe('MainContent', () => {
  it('renders MainContent component with provided children', () => {
    const mockChild = <div data-testid="ti-mock-child">Mock Child</div>;

    render(<MainContent>{mockChild}</MainContent>);

    const mainContentElement = screen.getByTestId('ti-main-content');
    expect(mainContentElement).toBeInTheDocument();

    const childElement = screen.getByTestId('ti-mock-child');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Mock Child');
  });

  it('renders MainContent component without children', async () => {
    const callback = () => render(<MainContent />);

    expect(callback).toThrow('MainContent element needs to have children element.');
  });
});
