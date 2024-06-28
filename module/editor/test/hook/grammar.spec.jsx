import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useGrammar } from '$editor/hook/grammar';
import { Provider } from 'react-redux';
import { appStore } from '$editor/store/app-store';
import { languageActions } from '$editor/store/slice/language-slice';

describe('useGrammar', () => {
  const initialState = {
    language: {
      selectedGrammar: 'DEFAULT',
      grammars: {
        DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples: [] },
      },
      isFetched: false,
      isInitialized: false,
    },
  };

  const renderUseGrammar = (grammarDefinition = {}) => {
    const result = renderHook(() => useGrammar(), {
      wrapper: ({ children }) => <Provider store={appStore}>{children}</Provider>,
    });

    act(() => appStore.dispatch(languageActions.initializeAfterFetching({ grammars: initialState.language.grammars })));

    act(() => appStore.dispatch(languageActions.initializeGrammarDefinition({ name: 'DEFAULT', grammarDefinition })));

    return { ...result, store: appStore };
  };

  it('should return empty object when grammar definition is undefined', () => {
    const { result } = renderUseGrammar({ grammarDefinition: undefined });

    expect(result.current).toEqual({});
  });

  it('should return grammar object based on grammarDefinition', () => {
    const grammarDefinition = {
      syntax: [
        {
          syntaxType: 'KEYWORD',
          pattern: {
            pattern: '/test1/gi',
          },
        },
        {
          syntaxType: 'COMMENT',
          pattern: {
            pattern: '/test2/g',
          },
        },
      ],
    };

    const expectedResult = {
      keyword: {
        pattern: /test1/gi,
        greedy: undefined,
        lookbehind: undefined,
      },
      comment: {
        pattern: /test2/g,
        greedy: undefined,
        lookbehind: undefined,
      },
    };

    const { result } = renderUseGrammar(grammarDefinition);

    expect(result.current).toEqual(expectedResult);
  });
});
