import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../../src/component/button';
import { ButtonIconPos } from '../../src/component/const/button-icon-pos';

describe('Button', () => {
  const mockLabel = 'Click me';
  const mockIcon = <div data-testid="mock-icon">Icon</div>;
  const mockOnClick = jest.fn();
  const mockTestId = 'test-button';

  it('should render button component with default props', () => {
    render(<Button label={mockLabel} icon={mockIcon} onClick={mockOnClick} testId={mockTestId} />);

    const buttonElement = screen.getByTestId(mockTestId);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveTextContent(mockLabel);
    expect(screen.getByTestId(`${mockTestId}--btn-content`)).toBeInTheDocument();
    expect(screen.getByTestId(`${mockTestId}--btn-label`)).toBeInTheDocument();
    expect(screen.getByTestId(`${mockTestId}--btn-icon-left`)).toBeInTheDocument();
    expect(screen.queryByTestId(`${mockTestId}--btn-icon-right`)).toBeNull();
  });

  it('should call click method when the button is clicked', () => {
    render(<Button label={mockLabel} icon={mockIcon} onClick={mockOnClick} testId={mockTestId} />);

    const buttonElement = screen.getByTestId(mockTestId);
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should renders button component with icon on the right', () => {
    render(
      <Button
        label={mockLabel}
        icon={mockIcon}
        onClick={mockOnClick}
        iconPlacement={ButtonIconPos.RIGHT}
        testId={mockTestId}
      />,
    );

    const buttonElement = screen.getByTestId(mockTestId);
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByTestId(`${mockTestId}--btn-icon-right`)).toBeInTheDocument();
    expect(screen.queryByTestId(`${mockTestId}--btn-icon-left`)).toBeNull();
  });

  it('should render button component with isLoading state', () => {
    render(<Button label={mockLabel} icon={mockIcon} onClick={mockOnClick} isLoading testId={mockTestId} />);

    const buttonElement = screen.getByTestId(mockTestId);
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByTestId('ti-button-spinner-icon')).toBeInTheDocument();
  });

  it('should render button component with isCopied state', () => {
    render(<Button label={mockLabel} icon={mockIcon} onClick={mockOnClick} isCopied testId={mockTestId} />);

    const buttonElement = screen.getByTestId(mockTestId);
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByTestId('ti-button-copy-success-icon')).toBeInTheDocument();
  });
});
