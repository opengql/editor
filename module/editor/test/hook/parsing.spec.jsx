import { cleanup, act } from '@testing-library/react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParsing } from '$editor/hook/parsing';
import { useSelector } from 'react-redux';
import { Editor } from '$editor/container/editor';
import { storeRender } from '$editor-test/helper/store-render';
import { useLanguageCurrentGrammar } from '$editor/store/hook/language';

describe('useParsing', () => {
  const mockWorker = {
    postMessage: jest.fn(),
    terminate: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    onmessage: jest.fn(),
    onerror: jest.fn(),
    onmessageerror: jest.fn(),
    dispatchEvent: jest.fn(),
  };

  const exampleWorkerInfo = { name: 'worker', fileName: 'workerFile.js' };

  beforeEach(() => {
    global.Worker = jest.fn().mockReturnValue(mockWorker);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  const TestComponent = ({ text, workerInfo, onRender }) => {
    const state = useSelector((state) => state.editor.state);
    const { grammarDefinition, examples } = useLanguageCurrentGrammar();
    const errors = useSelector((state) => state.parserResult.errors);
    const tree = useSelector((state) => state.parserResult.tree);

    useParsing(text, workerInfo);

    useEffect(() => {
      onRender({ state, grammarDefinition, examples, errors, tree });
    }, [state, grammarDefinition, examples, errors, tree]);

    return <Editor />;
  };

  TestComponent.propTypes = {
    text: PropTypes.string.isRequired,
    workerInfo: PropTypes.object.isRequired,
    onRender: PropTypes.func.isRequired,
  };

  it('should change state to fetching after mount', () => {
    const onRender = jest.fn();
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={onRender} />);

    const expectedObj = { errors: [], examples: [], grammarDefinition: {}, state: 'FETCHING', tree: [] };
    expect(onRender).toHaveBeenNthCalledWith(2, expect.objectContaining(expectedObj));
  });

  it('should set isFetching to true when fetching grammars from the worker', () => {
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={() => {}} />);

    act(() => mockWorker.onmessage({ data: [{ name: 'DEFAULT', label: 'Default', defaultQuery: '', examples: [] }] }));

    expect(mockWorker.postMessage).toHaveBeenCalledWith({ type: 'fetch-grammars' });
  });

  it('should change state to initializing after fetch grammars', () => {
    const onRender = jest.fn();
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={onRender} />);

    act(() => mockWorker.onmessage({ data: [{ name: 'DEFAULT', label: 'Default', defaultQuery: '', examples: [] }] }));

    act(() => mockWorker.onmessage({ data: { name: 'DEFAULT', grammarDefinition: {} } }));

    const expectedObj = { errors: [], examples: [], grammarDefinition: undefined, state: 'INITIALIZING', tree: [] };
    expect(onRender).toHaveBeenCalledWith(expect.objectContaining(expectedObj));
  });

  it('should set isInitializing to true when initializing the worker', () => {
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={() => {}} />);

    act(() => mockWorker.onmessage({ data: [{ name: 'DEFAULT', label: 'Default', defaultQuery: '', examples: [] }] }));

    act(() => mockWorker.onmessage({ data: { name: 'DEFAULT', grammarDefinition: {} } }));

    const expectedPayload = { type: 'initialize', payload: { selectedGrammar: 'DEFAULT' } };
    expect(mockWorker.postMessage).toHaveBeenCalledWith(expectedPayload);
  });

  it('should set isParsing to true when parsing starts', async () => {
    const onRender = jest.fn();
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={onRender} />);

    act(() => mockWorker.onmessage({ data: [{ name: 'DEFAULT', label: 'Default', defaultQuery: '', examples: [] }] }));

    act(() => mockWorker.onmessage({ data: { name: 'DEFAULT', grammarDefinition: {} } }));

    act(() => mockWorker.onmessage({ data: { errors: [], tree: [] } }));

    const expectedObject = { errors: [], examples: [], grammarDefinition: {}, tree: [] };
    expect(onRender).toHaveBeenLastCalledWith(expect.objectContaining(expectedObject));
  });

  it('should set parsingData correctly on parse response', async () => {
    const onRender = jest.fn();
    storeRender(<TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={onRender} />);

    act(() => mockWorker.onmessage({ data: [{ name: 'DEFAULT', label: 'Default', defaultQuery: '', examples: [] }] }));

    act(() => mockWorker.onmessage({ data: { name: 'DEFAULT', grammarDefinition: {} } }));

    act(() => mockWorker.onmessage({ data: { errors: [], tree: [] } }));

    const expectedObject = { errors: [], examples: [], grammarDefinition: {}, tree: [] };
    expect(onRender).toHaveBeenLastCalledWith(expect.objectContaining(expectedObject));
  });

  it('should terminate worker on unmount', () => {
    const { unmount } = storeRender(
      <TestComponent text="sample text" workerInfo={exampleWorkerInfo} onRender={() => {}} />,
    );
    unmount();
    expect(mockWorker.terminate).toHaveBeenCalled();
  });
});
