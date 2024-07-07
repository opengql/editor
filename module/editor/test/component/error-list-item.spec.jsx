import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorListItem } from '$editor/component/error-list-item';

describe('ErrorListItem', () => {
  const mockError = {
    lineIndex: 3,
    charPosition: 7,
    message: 'Syntax error',
  };

  const mockErrorIndex = 1;

  it('should render error list item component with correct error data', () => {
    render(<ErrorListItem error={mockError} errorIndex={mockErrorIndex} />);

    const errorListElement = screen.getByTestId(`ti-parsing-status-errors--errors-list-element-${mockErrorIndex}`);
    expect(errorListElement).toBeInTheDocument();

    const errorPositionLabel = screen.getByText(`error at ${mockError.lineIndex}:${mockError.charPosition}`);
    expect(errorPositionLabel).toBeInTheDocument();

    const errorMessage = screen.getByText(mockError.message);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should trigger handle click function when clicked', () => {
    render(
      <>
        <textarea id="code-textarea--input" defaultValue="Line 1\nLine 2\nLine 3\n" />
        <ErrorListItem error={mockError} errorIndex={mockErrorIndex} />
      </>,
    );

    const errorListElement = screen.getByTestId(`ti-parsing-status-errors--errors-list-element-${mockErrorIndex}`);

    expect(errorListElement).toBeInTheDocument();

    const handleClickSpy = jest.spyOn(global.document, 'getElementById');

    fireEvent.click(errorListElement);

    expect(handleClickSpy).toHaveBeenCalled();
    expect(handleClickSpy).toHaveBeenCalledWith('code-textarea--input');

    handleClickSpy.mockRestore();
  });

  it('should sets selection range and focuses textarea when clicked', () => {
    const result = render(
      <>
        <textarea id="code-textarea--input" defaultValue="Line 1\nLine 2\nLine 3\n" />
        <ErrorListItem error={mockError} errorIndex={mockErrorIndex} />
      </>,
    );

    const errorListElement = screen.getByTestId(`ti-parsing-status-errors--errors-list-element-${mockErrorIndex}`);

    expect(errorListElement).toBeInTheDocument();

    const textArea = result.container.querySelector('#code-textarea--input');
    const setSelectionRangeSpy = jest.spyOn(textArea, 'setSelectionRange');
    const focusSpy = jest.spyOn(textArea, 'focus');

    fireEvent.click(errorListElement);

    expect(setSelectionRangeSpy).toHaveBeenCalled();
    expect(focusSpy).toHaveBeenCalled();

    setSelectionRangeSpy.mockRestore();
    focusSpy.mockRestore();
  });
});
