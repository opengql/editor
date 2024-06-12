import { renderHook } from '@testing-library/react';
import { useParseTreeConverter } from '$editor/hook/parse-tree-converter';
import { ParseTreeNodeType } from '$editor/const/parse-tree-node-type';

describe('useParseTreeConverter', () => {
  const mockParseTree = [
    {
      type: ParseTreeNodeType.NORMAL,
      ruleName: 'test1',
      ruleChildren: [
        {
          type: ParseTreeNodeType.TERMINAL,
          symbolType: 1,
          symbolText: 'Test 2',
        },
        {
          type: ParseTreeNodeType.NORMAL,
          ruleName: 'test1',
          ruleChildren: [
            {
              type: ParseTreeNodeType.TERMINAL,
              symbolType: 2,
              symbolText: 'Test 2',
            },
            {
              type: ParseTreeNodeType.TERMINAL,
              symbolType: 3,
              symbolText: 'Test 2',
            },
          ],
        },
      ],
    },
  ];

  it('should convert parse tree to nodes and edges correctly', async () => {
    const { result } = renderHook(() => useParseTreeConverter(mockParseTree));
    const { nodes, edges } = result.current.convertResult;

    const expectedNodes = [
      { id: 0, label: '(non-terminal)\ntest1', level: 0, color: '#00b69d' },
      { id: 1, label: '(terminal)\nTest 2', level: 1, color: '#2270ff' },
      { id: 2, label: '(non-terminal)\ntest1', level: 1, color: '#00b69d' },
      { id: 3, label: '(terminal)\nTest 2', level: 2, color: '#2270ff' },
      { id: 4, label: '(terminal)\nTest 2', level: 2, color: '#2270ff' },
    ];

    const expectedEdges = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
    ];

    expect(nodes).toEqual(expectedNodes);
    expect(edges).toEqual(expectedEdges);
  });

  it('should handle empty parse tree', async () => {
    const emptyParseTree = [];
    const { result } = renderHook(() => useParseTreeConverter(emptyParseTree));
    const { nodes, edges } = result.current.convertResult;
    expect(nodes).toEqual([]);
    expect(edges).toEqual([]);
  });
});
