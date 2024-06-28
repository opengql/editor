/***
 * @typedef {object} TerminalParseTreeNode
 * @property {string} type - the type of the parse tree node (must be TERMINAL)
 * @property {string} symbolName - the name of the terminal symbol
 * @property {string} symbolValue - the value of the terminal symbol
 */

/***
 * @typedef {object} NormalParseTreeNode
 * @property {string} type - the type of the parse tree node (must be NORMAL)
 * @property {string} ruleName - the name of the rule
 * @property {Object[]} ruleChildren - an array of child nodes
 */

/***
 * Representation of types {@link TerminalParseTreeNode} and {@link NormalParseTreeNode} that can be placed instead of this definition
 *
 * @typedef {TerminalParseTreeNode|NormalParseTreeNode} ParseTreeNode
 */
