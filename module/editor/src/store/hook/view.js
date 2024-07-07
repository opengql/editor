import { useSelector } from 'react-redux';

/***
 * Hook that returns the current value of view type from the application state.
 *
 * @returns {CodeEditorViewType}
 */
export const useViewType = () => useSelector((state) => state.view.type);
