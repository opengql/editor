/***
 * Object that contains all parse tree node types.
 *
 * @readonly
 * @property NORMAL represents node that can have children and in parse result empty normal node is the same as parse error. It's not a leaf node.
 * @property TERMINAL represents leaf node that contains part of input from the parsed code. This node can't have children.
 * @enum {string}
 */
export const ParseTreeNodeType = {
  NORMAL: 'NORMAL',
  TERMINAL: 'TERMINAL',
};
