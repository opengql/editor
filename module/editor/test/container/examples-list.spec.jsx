import React from 'react';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import { ExamplesList } from '$editor/container/examples-list';
import { storeRouterRender } from '$editor-test/helper/store-render';
import { languageActions } from '$editor/store/slice/language-slice';
import { editorActions } from '$editor/store/slice/editor-slice';
import { ParseState } from '$editor/const/parse-state';
import { ExamplesSearch } from '$editor/container/examples-search';

describe('ExamplesList', () => {
  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(languageActions.initializeAfterFetching({ grammars: state.language.grammars }));
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

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render loading spinner when loading', () => {
    const { getByTestId } = renderExamplesList({
      language: {
        selectedGrammar: 'DEFAULT',
        grammars: {
          DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples: [] },
        },
      },
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

    renderExamplesList({
      language: {
        selectedGrammar: 'DEFAULT',
        grammars: {
          DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples },
        },
      },
    });

    const examplesList = screen.getByTestId('ti-examples-list');

    expect(examplesList).toBeInTheDocument();
    expect(examplesList.children).toHaveLength(examples.length);
  });

  it('should trigger editor value update when example is clicked', () => {
    const examples = [{ name: 'example', code: 'example code' }];

    const { store } = renderExamplesList({
      language: {
        selectedGrammar: 'DEFAULT',
        grammars: {
          DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples },
        },
      },
    });

    const exampleListItem = screen.getByText('example code');

    act(() => fireEvent.click(exampleListItem));

    const editorValue = store.getState().editor.value;

    expect(editorValue).toEqual('example code');
  });
});
