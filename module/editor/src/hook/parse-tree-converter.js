import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParseTreeNode } from '../type/parse-tree-node';
import { ParseTreeNodeType } from '../const/parse-tree-node-type';

const TERMINAL_NODE_COLOR = '#2270ff';
const NON_TERMINAL_NODE_COLOR = '#00b69d';

// interface UseParseTreeConverter {
//   readonly isConverting: boolean;
//   readonly convertResult: ConvertResult;
// }

export const useParseTreeConverter = (parseTree) => {
  const [isConverting, setIsConverting] = useState(false);
  const [convertResult, setConvertResult] = useState({ nodes: [], edges: [] });

  const loadDataFromParseTree = (nodes, edges, treeNodes) => {
    const stack = [];
    stack.push({ treeNodes, level: 0 });

    while (stack.length > 0) {
      const currentStackElement = stack.pop();

      if (currentStackElement === undefined) {
        break;
      }

      const { treeNodes, level, parent } = currentStackElement;

      for (const treeNode of treeNodes) {
        const id = nodes.length;

        if (treeNode.type === ParseTreeNodeType.TERMINAL) {
          if (parent === undefined) {
            continue;
          }

          const label = `(terminal)\n${treeNode.symbolText}`;
          const color = TERMINAL_NODE_COLOR;
          const node = { id, label, level, color };
          nodes.push(node);
        }

        if (treeNode.type === ParseTreeNodeType.NORMAL) {
          const label = `(non-terminal)\n${treeNode.ruleName}`;
          const color = NON_TERMINAL_NODE_COLOR;
          const node = { id, label, level, color };
          nodes.push(node);

          stack.push({
            treeNodes: treeNode.ruleChildren,
            level: level + 1,
            parent: node,
          });
        }

        if (parent !== undefined) {
          const edge = { from: parent.id, to: id };
          edges.push(edge);
        }
      }
    }
  };

  useEffect(() => {
    const nodes = [];
    const edges = [];

    if (parseTree.length === 0) {
      setConvertResult({ nodes, edges });
      return;
    }

    setIsConverting(true);
    loadDataFromParseTree(nodes, edges, parseTree);
    setConvertResult({ nodes, edges });
    setIsConverting(false);
  }, [parseTree]);

  return { isConverting, convertResult };
};

useParseTreeConverter.propTypes = PropTypes.arrayOf(ParseTreeNode);
