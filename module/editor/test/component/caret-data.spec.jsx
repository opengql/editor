import React from 'react';
import { render, screen } from '@testing-library/react';
import { CaretData } from '$editor/component/caret-data';

describe('CaretData', () => {
  const mockPosition = { x: 10, y: 20 };

  it('should render caret data component with default props', () => {
    render(<CaretData />);

    const caretDataElement = screen.getByText('0:0');

    expect(caretDataElement).toBeInTheDocument();
  });

  it('should render caret data component with provided position', () => {
    render(<CaretData position={mockPosition} />);

    const caretDataElement = screen.getByText(`${mockPosition.x}:${mockPosition.y}`);

    expect(caretDataElement).toBeInTheDocument();
  });

  it('should renders caret data component with default position when position prop is not provided', () => {
    render(<CaretData />);

    const caretDataElement = screen.getByText('0:0');

    expect(caretDataElement).toBeInTheDocument();
  });

  it('should render caret data component with updated position when position prop is provided', () => {
    const updatedPosition = { x: 30, y: 40 };

    render(<CaretData position={mockPosition} />);

    const caretDataElement = screen.getByText(`${mockPosition.x}:${mockPosition.y}`);

    expect(caretDataElement).toBeInTheDocument();

    render(<CaretData position={updatedPosition} />);

    const updatedCaretDataElement = screen.getByText(`${updatedPosition.x}:${updatedPosition.y}`);

    expect(updatedCaretDataElement).toBeInTheDocument();
  });
});
