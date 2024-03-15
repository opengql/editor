import '@testing-library/jest-dom';
import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { ExamplesList } from '../../src/container/examples-list';
import { storeRouterRender } from '../helper/store-render';
import { languageActions } from '../../src/state/slice/language-slice';
import { editorActions } from '../../src/state/slice/editor-slice';
import { ParseState } from '../../src/const/parse-state';
import { ExamplesSearch } from '../../src/container/examples-search';

describe('ExamplesList', () => {
  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(languageActions.initialize({ examples: state.language.examples }));
      store.dispatch(editorActions.setState(state.editor?.state ?? ParseState.IDLE));
    });
  };

  const renderExamplesList = (state) => {
    const result = storeRouterRender(
      <>
        <ExamplesSearch />
        <ExamplesList />
      </>,
    );

    initializeStore(result.store, state);
    return result;
  };

  it('should render loading spinner when loading', () => {
    const { getByTestId } = renderExamplesList({
      language: { examples: [] },
      editor: { state: ParseState.INITIALIZING },
    });

    const loadingElement = getByTestId('ti-loading-examples-wrapper');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should render examples list when not loading', () => {
    const examples = [
      { name: 'name-1', code: 'example 1 code' },
      { name: 'name-1', code: 'example 2 code' },
    ];

    renderExamplesList({ language: { examples } });

    const examplesList = screen.getByTestId('ti-examples-list');

    expect(examplesList).toBeInTheDocument();
    expect(examplesList.children).toHaveLength(examples.length);
  });

  it('should trigger editor value update when example is clicked', () => {
    const examples = [{ name: 'example', code: 'example code' }];

    const { store } = renderExamplesList({ language: { examples } });

    const exampleListItem = screen.getByText('example code');

    act(() => fireEvent.click(exampleListItem));

    const editorValue = store.getState().editor.value;

    expect(editorValue).toEqual('example code');
  });
});
