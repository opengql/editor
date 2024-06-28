import { useSelector } from 'react-redux';

/***
 * Hook to get the current state of the editor from the application state.
 * This variable is used to indicate current state of parsing process.
 * @returns {ParseState}
 */
export const useEditorState = () => useSelector((state) => state.editor.state);

/***
 * Hook to get the current value of the editor from the application state.
 * This variable is synced with the code editor input.
 * Change of this variable will also affect the editor.
 * @returns {string}
 */
export const useEditorValue = () => useSelector((state) => state.editor.value);
