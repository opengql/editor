import { useSelector } from 'react-redux';

/***
 * @typedef {import('$editor/type/parse-error.js').ParseError} ParseError
 */

/***
 * Hook that returns errors that are a result of the parsing process from application state.
 * This variable is set when the parse process of worker completes his job.
 *
 * @returns {ParseError[]}
 */
export const useParserResultErrors = () => useSelector((state) => state.parserResult.errors);

/***
 * Hook that returns the parse tree of parsed code from the application state.
 * This variable is set when the parse process of worker completes his job.
 *
 * @returns {ParseTreeNode}
 */
export const useParserResultTree = () => useSelector((state) => state.parserResult.tree);
