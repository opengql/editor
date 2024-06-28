import { useSelector } from 'react-redux';

/***
 * @typedef {import('$editor/store/type/examples-search-options').ExamplesSearchOptions} ExamplesSearchOptions
 */

/***
 * Hook that return current search algorithm options from the application state.
 *
 * @returns {ExamplesSearchOptions}
 */
export const useExamplesSearchOptions = () => useSelector((state) => state.examplesSearch.options);

/***
 * Hook that return current phrase set in the search input from the application state.
 *
 * @returns {string}
 */
export const useExamplesSearchPhrase = () => useSelector((state) => state.examplesSearch.phrase);

/***
 * Hook that represent the search result for the current phrase from the application state.
 *
 * @returns {CodeExample[]}
 */
export const useExamplesSearchResult = () => useSelector((state) => state.examplesSearch.result ?? []);
