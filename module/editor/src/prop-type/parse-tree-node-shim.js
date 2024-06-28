import PropTypes from 'prop-types';
import { ParseTreeNodeType } from '$editor/const/parse-tree-node-type';

/**
 * Defines the shape of a {@link TerminalParseTreeNode} type
 */
const TerminalParseTreeNodeShape = PropTypes.shape({
  type: PropTypes.oneOf([ParseTreeNodeType.TERMINAL]).isRequired,
  symbolName: PropTypes.string.isRequired,
  symbolValue: PropTypes.string.isRequired,
});

/**
 * Defines the shape of a {@link NormalParseTreeNode} type
 */
const NormalParseTreeNodeShape = PropTypes.shape({
  type: PropTypes.oneOf([ParseTreeNodeType.NORMAL]).isRequired,
  ruleName: PropTypes.string.isRequired,
  ruleChildren: PropTypes.arrayOf(PropTypes.object).isRequired,
});

/**
 * Defines a parse tree node that can be either a terminal or normal node.
 */
export const ParseTreeNodeShim = PropTypes.oneOfType([TerminalParseTreeNodeShape, NormalParseTreeNodeShape]);
