import React from 'react';
import { render, screen } from '@testing-library/react';
import { If } from '$editor/component/if';

describe('If', () => {
  it('should render children when condition is true', () => {
    const mockCondition = true;

    render(
      <If condition={mockCondition}>
        <div data-testid="child-element">This is the child element</div>
      </If>,
    );

    const childElement = screen.getByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('This is the child element');
  });

  it('should not render children when condition is false', () => {
    const mockCondition = false;

    render(
      <If condition={mockCondition}>
        <div data-testid="child-element">This is the child element</div>
      </If>,
    );

    const childElement = screen.queryByTestId('child-element');
    expect(childElement).toBeNull();
  });
});
