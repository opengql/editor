import '@testing-library/jest-dom';
import React from 'react';
import { storeRender } from '../helper/store-render';
import { StatusBar } from '../../src/container/status-bar';
import { act } from '@testing-library/react';
import { parseResultActions } from '../../src/state/slice/parse-result-slice';
import { editorActions } from '../../src/state/slice/editor-slice';
import { ParseState } from '../../src/const/parse-state';
import { caretDataActions } from '../../src/state/slice/caret-data-slice';

describe('StatusBar', () => {
  const initState = (store, { errors, state, selectionStart }) => {
    act(() => {
      store.dispatch(parseResultActions.update({ errors: errors ?? [] }));
      store.dispatch(editorActions.setState(state ?? ParseState.IDLE));
      store.dispatch(caretDataActions.update({ selectionStart: selectionStart ?? 0, value: 'example value' }));
    });
  };

  const renderStatusBar = (state = {}) => {
    const result = storeRender(<StatusBar />);

    initState(result.store, state);

    return result;
  };

  it('should render component without crashing', () => {
    const { getByTestId } = renderStatusBar();

    expect(getByTestId('ti-status-bar')).toBeInTheDocument();
  });

  it('should render parse state indicator with correct props', () => {
    const { getByTestId } = renderStatusBar({
      errors: [{ message: 'Error 1' }, { message: 'Error 2' }],
      state: ParseState.PARSING,
    });

    expect(getByTestId('ti-parsing-state')).toBeInTheDocument();
    expect(getByTestId('ti-parsing-status--label-parsing')).toBeInTheDocument();
  });

  it('should render caret data with correct props', () => {
    const { getByTestId, getByText, store } = renderStatusBar({ selectionStart: 10 });

    const caretPosition = store.getState().caretData.position;

    expect(getByTestId('ti-caret-data')).toBeInTheDocument();
    expect(getByText(`${caretPosition.x}:${caretPosition.y}`)).toBeInTheDocument();
  });
});
