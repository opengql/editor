import PropTypes from 'prop-types';
import { ParseTreeNodeType } from '../const/parse-tree-node-type';

const TerminalParseTreeNode = PropTypes.shape({
  type: PropTypes.oneOf([ParseTreeNodeType.TERMINAL]).isRequired,
  symbolName: PropTypes.string.isRequired,
  symbolValue: PropTypes.string.isRequired,
});

const NormalParseTreeNode = PropTypes.shape({
  type: PropTypes.oneOf([ParseTreeNodeType.NORMAL]).isRequired,
  ruleName: PropTypes.string.isRequired,
  ruleChildren: PropTypes.arrayOf(PropTypes.object).isRequired,
});

export const ParseTreeNode = PropTypes.oneOfType([TerminalParseTreeNode, NormalParseTreeNode]);
