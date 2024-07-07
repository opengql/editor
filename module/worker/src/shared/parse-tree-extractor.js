import { TreeNodeType } from '$worker/shared/const/tree-node-type';

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

/***
 * Class for extracting parse trees from a given parser.
 */
export class ParseTreeExtractor {
  /***
   * Creates an instance of ParseTreeExtractor.
   *
   * @param {import('antlr4').Parser} parser - The parser instance to extract parse trees from.
   */
  constructor(parser) {
    this.parser = parser;
    this.ruleNames = parser.ruleNames;
  }

  /***
   * Extracts a parse tree from the given parser rule context.
   *
   * @param {import('antlr4').ParserRuleContext} parserRuleContext - The parser rule context to extract the tree from.
   * @returns {ParseTreeNode[]} The extracted parse tree.
   */
  extract(parserRuleContext) {
    const outTree = [];
    this.performExtraction(parserRuleContext, outTree);
    return outTree;
  }

  /***
   * Performs the extraction of the parse tree recursively.
   *
   * @param {import('antlr4').ParserRuleContext} parseTree - The current node in the parse tree.
   * @param {ParseTreeNode[]} parentChildren - The children of the parent node.
   * @private
   */
  performExtraction(parseTree, parentChildren) {
    if ('children' in parseTree) {
      const treeNode = {
        type: TreeNodeType.NORMAL,
        ruleName: this.ruleNames[parseTree.ruleIndex],
        ruleChildren: [],
      };

      const children = parseTree.children || [];

      children.forEach((item) => {
        this.performExtraction(item, treeNode.ruleChildren);
      });

      parentChildren.push(treeNode);
    } else if ('symbol' in parseTree) {
      const symbol = parseTree.symbol;

      const treeNode = {
        type: TreeNodeType.TERMINAL,
        symbolType: symbol.type,
        symbolText: symbol.text,
      };

      parentChildren.push(treeNode);
    }
  }
}
