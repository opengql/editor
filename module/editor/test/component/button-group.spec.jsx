import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from '$editor/component/button-group';

describe('ButtonGroup', () => {
  const mockChild1 = <button key="1">Button 1</button>;
  const mockChild2 = <button key="2">Button 2</button>;

  it('should render button group component with children', () => {
    render(<ButtonGroup>{[mockChild1, mockChild2]}</ButtonGroup>);

    const buttonGroupElement = screen.getByTestId('ti-btn-group');

    expect(buttonGroupElement).toBeInTheDocument();

    const child1Element = screen.getByText('Button 1');

    expect(child1Element).toBeInTheDocument();

    const child2Element = screen.getByText('Button 2');

    expect(child2Element).toBeInTheDocument();
  });

  it('should render button group component with multiple children', () => {
    render(<ButtonGroup>{[mockChild1, mockChild2]}</ButtonGroup>);

    const buttonGroupElement = screen.getByTestId('ti-btn-group');

    expect(buttonGroupElement.children).toHaveLength(2);
  });

  it('should render button group component with no children', () => {
    render(<ButtonGroup>{[]}</ButtonGroup>);

    const buttonGroupElement = screen.getByTestId('ti-btn-group');

    expect(buttonGroupElement.children).toHaveLength(0);
  });
});
