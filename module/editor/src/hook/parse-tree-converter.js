import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParseTreeNodeType } from '$editor/const/parse-tree-node-type';
import { ParseTreeNodeShim } from '$editor/prop-type/parse-tree-node-shim';

const TERMINAL_NODE_COLOR = '#2270ff';
const NON_TERMINAL_NODE_COLOR = '#00b69d';

/***
 * Node representation used by the VIS graph library.
 *
 * @typedef {Object} Node
 * @property {number} id
 * @property {string} label
 * @property {number} level
 * @property {string} color
 */

/***
 * Edge representation used by the VIS graph library.
 *
 * @typedef {Object} Edge
 * @property {number} from
 * @property {number} to
 */

/***
 * Hook that generates the output of parse tree that is acceptable by vis graph library.
 *
 * @param {ParseTreeNode} parseTree
 * @returns {{convertResult: {nodes: Node[], edges: Edge[]}, isConverting: boolean}}
 */
export const useParseTreeConverter = (parseTree) => {
  const [isConverting, setIsConverting] = useState(false);
  const [convertResult, setConvertResult] = useState({ nodes: [], edges: [] });

  /***
   * Method that recursively converts the parse tree nodes received from parse result to nodes and edges.
   * This node and edges are accepted by the VIS graph library.
   *
   * @param {Node[]} nodes
   * @param {Edge[]} edges
   * @param {ParseTreeNode} treeNodes
   */
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

    if (parseTree?.length === 0) {
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

useParseTreeConverter.propTypes = PropTypes.arrayOf(ParseTreeNodeShim);
