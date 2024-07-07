/***
 * Object that contains all parse tree node types.
 *
 * @readonly
 * @property {string} NORMAL represents node that can have children and in parse result empty normal node is the same as parse error. It's not a leaf node.
 * @property {string} TERMINAL represents leaf node that contains part of input from the parsed code. This node can't have children.
 * @enum {string}
 */
export const TreeNodeType = {
  NORMAL: 'NORMAL',
  TERMINAL: 'TERMINAL',
};
