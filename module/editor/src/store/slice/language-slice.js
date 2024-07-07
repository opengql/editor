import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selectedGrammar: 'DEFAULT',
    grammars: {
      DEFAULT: {
        name: 'DEFAULT',
        label: '',
        grammarDefinition: {},
        examples: [],
      },
    },
    isFetched: false,
    isInitialized: false,
  },
  reducers: {
    setSelectedGrammar: (state, { payload }) => ({
      ...state,
      selectedGrammar: payload,
      isInitialized: state.grammars[payload].grammarDefinition !== undefined,
    }),
    initializeAfterFetching: (state, { payload }) => ({
      ...state,
      selectedGrammar: Object.values(payload.grammars)[0].name,
      grammars: payload.grammars,
      isFetched: true,
    }),
    initializeGrammarDefinition: (state, { payload: { name, grammarDefinition } }) => ({
      ...state,
      grammars: {
        ...state.grammars,
        [name]: {
          ...state.grammars[name],
          grammarDefinition,
        },
      },
      isInitialized: true,
    }),
  },
});

export const languageActions = languageSlice.actions;

export const languageReducer = languageSlice.reducer;
