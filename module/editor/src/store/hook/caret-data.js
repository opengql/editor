import { useSelector } from 'react-redux';

/***
 * Hook to read the position of caret stored in application state.
 * The returned object has two properties x and y.
 * Both are of number type.
 * @returns {CaretPosition}
 */
export const useCaretPosition = () => useSelector((state) => state.caretData.position);

/***
 * Hook to read the index of caret stored in application state.
 * This variable is used to estimate position of autocomplete modal.
 * @returns {number}
 */
export const useCaretIndex = () => useSelector((state) => state.caretData.index);

/***
 * Hook to read the index of next caret stored in application state.
 * This variable is used to set the code editor caret position.
 * Value in this variable resets after each update of caret position.
 * Default value returned after reset is -1.
 * @returns {number}
 */
export const useCaretNextIndex = () => useSelector((state) => state.caretData.nextIndex);
