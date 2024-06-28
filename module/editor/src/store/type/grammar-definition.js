/***
 * @typedef {Object} SyntaxToken
 * @property {RegExp} pattern - the regex pattern to match the syntax
 * @property {boolean} [lookbehind] - whether the match should be preceded by a specific substring
 * @property {boolean} [greedy] - whether the regex should be greedy
 */

/***
 * @typedef {Object} SyntaxObject
 * @property {SyntaxToken|SyntaxToken[]} pattern - the pattern(s) to match the syntax
 * @property {SyntaxType} syntaxType - the type of syntax
 */

/***
 * @typedef {Object} GrammarDefinition
 * @property {string} name - the name of the grammar
 * @property {string[]} keywords - the keywords of the grammar
 * @property {SyntaxObject[]} syntax - the syntax objects of the grammar
 */
