import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { ExamplesSearch } from '$editor/container/examples-search';
import { languageActions } from '$editor/store/slice/language-slice';
import { editorActions } from '$editor/store/slice/editor-slice';
import { ParseState } from '$editor/const/parse-state';
import { storeRouterRender } from '$editor-test/helper/store-render';
import { exampleSearchActions } from '$editor/store/slice/examples-search-slice';

describe('ExamplesSearch', () => {
  const initialState = {
    language: {
      selectedGrammar: 'DEFAULT',
      grammars: {
        DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples: [] },
      },
    },
  };

  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(
        languageActions.initializeAfterFetching({
          grammars: state.language?.grammars ?? initialState.language.grammars,
        }),
      );

      store.dispatch(editorActions.setState(state.editor?.state ?? ParseState.IDLE));
      store.dispatch(exampleSearchActions.setPhrase(state.examplesSearch.phrase));
    });
  };

  const renderExamplesSearch = (state) => {
    const result = storeRouterRender(<ExamplesSearch />);

    initializeStore(result.store, state);
    return result;
  };

  it('should render search input with correct placeholder', () => {
    const { getByTestId } = renderExamplesSearch({ examplesSearch: { phrase: '', options: {} } });

    const searchInput = getByTestId('ti-examples-search-input');

    expect(searchInput).not.toBeUndefined();
    expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  it('should update state on input value change', () => {
    const { getByTestId, store } = renderExamplesSearch({ examplesSearch: { phrase: '', options: {} } });

    const searchInput = getByTestId('ti-examples-search-input');

    act(() => fireEvent.change(searchInput, { target: { value: 'test' } }));

    const searchPhrase = store.getState().examplesSearch.phrase;

    expect(searchPhrase).toEqual('test');
  });

  it('should update search results after typing', () => {
    const examples = [
      { name: 'example-1', code: 'example 1 code' },
      { name: 'example-2', code: 'example 2 code' },
    ];

    const { getByTestId, store } = renderExamplesSearch({
      examplesSearch: { phrase: '', options: {} },
      language: {
        selectedGrammar: 'DEFAULT',
        grammars: {
          DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples },
        },
      },
    });

    const searchInput = getByTestId('ti-examples-search-input');

    act(() => fireEvent.change(searchInput, { target: { value: 'example-2' } }));

    const searchResult = store.getState().examplesSearch.result;
    expect(searchResult[0]).toBe(examples[1]);
    expect(searchResult[1]).toBe(examples[0]);
  });
});
