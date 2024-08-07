import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AutocompleteOption } from '$editor/component/autocomplete-option';

describe('AutocompleteOption', () => {
  const mockValue = 'Option 1';
  const mockIndex = 0;
  const mockSelectedIndex = 0;
  const mockNotSelectedIndex = 10;
  const mockOnOptionClick = jest.fn();

  it('should render AutocompleteOption component with correct props', () => {
    const { getByTestId } = render(
      <AutocompleteOption
        value={mockValue}
        index={mockIndex}
        selectedIndex={mockSelectedIndex}
        onOptionClick={mockOnOptionClick}
      />,
    );

    const autocompleteOptionElement = getByTestId(`ti-autocomplete-option-${mockIndex}`);

    expect(autocompleteOptionElement).toBeInTheDocument();
    expect(autocompleteOptionElement).toHaveTextContent(mockValue);
    expect(autocompleteOptionElement).toHaveClass('autocompleteModalElement');
    expect(autocompleteOptionElement).toHaveClass('autocompleteModalSelectedElement');
  });

  it('should render AutocompleteOption component with additional class when selected', () => {
    const { getByTestId } = render(
      <AutocompleteOption
        value={mockValue}
        index={mockIndex}
        selectedIndex={mockSelectedIndex}
        onOptionClick={mockOnOptionClick}
      />,
    );

    const autocompleteOptionElement = getByTestId(`ti-autocomplete-option-${mockIndex}`);

    expect(autocompleteOptionElement).toBeInTheDocument();
    expect(autocompleteOptionElement).toHaveClass('autocompleteModalSelectedElement');
  });

  it('should render AutocompleteOption component without additional class when not selected', () => {
    const { getByTestId } = render(
      <AutocompleteOption
        value={mockValue}
        index={mockIndex}
        selectedIndex={mockNotSelectedIndex}
        onOptionClick={mockOnOptionClick}
      />,
    );

    const autocompleteOptionElement = getByTestId(`ti-autocomplete-option-${mockIndex}`);

    expect(autocompleteOptionElement).toBeInTheDocument();
    expect(autocompleteOptionElement).not.toHaveClass('autocompleteModalSelectedElement');
  });

  it('should call option click method when clicked', () => {
    render(
      <AutocompleteOption
        value={mockValue}
        index={mockIndex}
        selectedIndex={mockSelectedIndex}
        onOptionClick={mockOnOptionClick}
      />,
    );

    const autocompleteOptionElement = screen.getByTestId(`ti-autocomplete-option-${mockIndex}`);
    fireEvent.click(autocompleteOptionElement);

    expect(mockOnOptionClick).toHaveBeenCalledWith(mockIndex);
  });
});
