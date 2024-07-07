import React from 'react';
import { ParseTreeNodeType } from '$editor/const/parse-tree-node-type';
import { storeRender } from '$editor-test/helper/store-render';
import { ParseTreeView } from '$editor/container/parse-tree-view';
import { act } from '@testing-library/react';
import { parseResultActions } from '$editor/store/slice/parse-result-slice';
import { editorActions } from '$editor/store/slice/editor-slice';
import { ParseState } from '$editor/const/parse-state';
import { Network } from 'vis-network';

const clearAllMocks = jest.clearAllMocks;

const mockedNetwork = {
  destroy: jest.fn(),
  fit: jest.fn(),
  redraw: jest.fn(),
};

jest.mock('vis-network', () => ({
  Network: jest.fn().mockImplementation(() => mockedNetwork),
}));

describe('ParseTreeView', () => {
  const mockData = [
    {
      type: ParseTreeNodeType.NORMAL,
      ruleName: 'test1',
      ruleChildren: [
        {
          type: ParseTreeNodeType.TERMINAL,
          symbolText: 'Test 2',
          symbolType: 1,
        },
        {
          ruleName: 'test1',
          ruleChildren: [
            {
              type: ParseTreeNodeType.TERMINAL,
              symbolText: 'Test 2',
              symbolType: 1,
            },
            {
              type: ParseTreeNodeType.TERMINAL,
              symbolText: 'Test 2',
              symbolType: 1,
            },
          ],
        },
      ],
    },
  ];

  const initStore = (store, { parseTree, state }) => {
    act(() => {
      store.dispatch(parseResultActions.update({ parseTree: parseTree ?? mockData }));
      store.dispatch(editorActions.setState(state ?? ParseState.IDLE));
    });
  };

  const renderParseTreeView = (state = {}) => {
    const result = storeRender(<ParseTreeView />);
    initStore(result.store, state);
    return result;
  };

  afterEach(() => clearAllMocks());

  it('should render without crashing', () => {
    renderParseTreeView();
  });

  it('should render the loading state', () => {
    const { getByTestId } = renderParseTreeView({ state: ParseState.PARSING });

    const loadingIcon = getByTestId('ti-loading-parse-tree');

    expect(loadingIcon).toBeInTheDocument();
  });

  it('should render the parse tree container when not loading', () => {
    const { getByTestId } = renderParseTreeView();

    const container = getByTestId('ti-parse-tree--container');

    expect(container).toBeInTheDocument();
    expect(container).not.toHaveAttribute('style', 'display: none');
  });

  it('should do nothing if edges are empty', () => {
    const exampleParseTree = [
      {
        type: ParseTreeNodeType.TERMINAL,
        symbolText: 'Test 2',
        symbolType: 1,
      },
    ];

    renderParseTreeView({ parseTree: exampleParseTree });

    expect(Network).toHaveBeenCalledTimes(3);
  });

  it('should do nothing if nodes are empty', () => {
    renderParseTreeView({ parseTree: [] });

    expect(Network).toHaveBeenCalledTimes(3);
  });

  it('should render network while provided valid input', async () => {
    const { getByTestId } = renderParseTreeView();

    const container = getByTestId('ti-parse-tree--container');

    expect(container).toBeVisible();
  });

  it('should initialize and destroy network when parse tree data changes', () => {
    const { unmount } = renderParseTreeView();

    unmount();

    expect(Network).toHaveBeenCalledTimes(2);
    expect(mockedNetwork.destroy).toHaveBeenCalledTimes(3);
    expect(mockedNetwork.fit).toHaveBeenCalledTimes(2);
    expect(mockedNetwork.redraw).toHaveBeenCalledTimes(2);
  });
});
