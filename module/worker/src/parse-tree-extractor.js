import { TreeNodeType } from './const/tree-node-type';

export class ParseTreeExtractor {
  constructor(parser) {
    this.parser = parser;
    this.ruleNames = parser.ruleNames;
  }

  extract(parserRuleContext) {
    const outTree = [];
    this.performExtraction(parserRuleContext, outTree);
    return outTree;
  }

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
