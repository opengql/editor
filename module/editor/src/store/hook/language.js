import { useSelector } from 'react-redux';

/***
 * @typedef {import('$editor/store/type/grammar.js').Grammar} Grammar
 */

/***
 * Hook that returns currently selected grammar object from application state.
 * Extraction of this variable is based on the selected grammar variable which contains name of current grammar.
 * When grammars are not fetched should return default empty grammar.
 * @returns {Grammar}
 */
export const useLanguageCurrentGrammar = () =>
  useSelector((state) => {
    const { selectedGrammar, grammars } = state.language;
    return grammars[selectedGrammar];
  });

/***
 * Hook that returns selected language grammar from the application state.
 * This value represents the language name gathered from the worker at fetch all state.
 * Change of this value will end with change of currently selected language.
 * @returns {string}
 */
export const useLanguageSelectedGrammar = () => useSelector((state) => state.language.selectedGrammar);

/***
 * Hook that returns the currently fetched grammars in form of object from the application state.
 * Each {Grammar} is assigned to a name property.
 * With this solution we can easily pick the grammar using only selected grammar variable which contains grammar name.
 * @returns {Record<string, Grammar>}
 */
export const useLanguageGrammars = () => useSelector((state) => state.language.grammars);

/***
 * Hook that returns value of the is fetched variable from the application state.
 * This variable is used to verify are grammars fetched.
 * @returns {boolean}
 */
export const useLanguageFetched = () => useSelector((state) => state.language.isFetched);

/***
 * Hook that returns value of the variable is initialized.
 * This variable is responsible for signing is currently selected grammar initialized.
 * By initialized it means that grammar definition is properly loaded from worker.
 * @returns {boolean}
 */
export const useLanguageInitialized = () => useSelector((state) => state.language.isInitialized);
