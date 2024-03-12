import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AutocompleteOption } from '../../src/component/autocomplete-option';

describe('AutocompleteOption', () => {
  const mockValue = 'Option 1';
  const mockIndex = 0;
  const mockSelectedIndex = 0;
  const mockOnOptionClick = jest.fn();

  it('renders AutocompleteOption component with correct props', () => {
    render(
      <AutocompleteOption
        value={mockValue}
        index={mockIndex}
        selectedIndex={mockSelectedIndex}
        onOptionClick={mockOnOptionClick}
      />,
    );

    const autocompleteOptionElement = screen.getByTestId(`ti-autocomplete-option-${mockIndex}`);
    expect(autocompleteOptionElement).toBeInTheDocument();
    expect(autocompleteOptionElement).toHaveTextContent(mockValue);
    expect(autocompleteOptionElement).toHaveClass('autocompleteModalElement');
    expect(autocompleteOptionElement).toHaveClass('autocompleteModalSelectedElement');
  });

  it('calls onOptionClick when clicked', () => {
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
