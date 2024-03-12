import React from 'react';
import PropTypes from 'prop-types';
import css from './style/autocomplete-option.module.css';

export const AutocompleteOption = ({ value, index, selectedIndex, onOptionClick }) => {
  const isSelectedClass = selectedIndex === index ? css.autocompleteModalSelectedElement : '';

  return (
    <li
      className={`${css.autocompleteModalElement} ${isSelectedClass}`}
      key={`autocomplete-option-${index}`}
      data-testid={`ti-autocomplete-option-${index}`}
      onClick={() => onOptionClick(index)}
    >
      {value}
    </li>
  );
};

AutocompleteOption.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onOptionClick: PropTypes.func.isRequired,
};
