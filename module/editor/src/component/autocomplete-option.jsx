import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import css from '$editor/component/style/autocomplete-option.module.css';

/***
 * Component that represents option rendered in autocomplete modal.
 * This component has two states of render.
 * There are different styles applied to the element if selectedIndex is equal to index and when index differs.
 *
 * @param {string} value represents label rendered in the option
 * @param {number} index represents the index of element in modal elements array
 * @param {number} selectedIndex represents currently selected modal element index
 * @param {function} onOptionClick function called when element is clicked
 * @returns {JSX.Element}
 * @constructor
 */
export const AutocompleteOption = ({ value, index, selectedIndex, onOptionClick }) => {
  const isSelectedClass = useCallback(
    () => (selectedIndex === index ? css.autocompleteModalSelectedElement : ''),
    [selectedIndex, index],
  );

  return (
    <li
      className={`${css.autocompleteModalElement} ${isSelectedClass()}`}
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
