import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    grammarDefinition: {},
    examples: [],
    isInitialized: false,
  },
  reducers: {
    initialize: (state, { payload }) => ({
      grammarDefinition: payload.grammarDefinition,
      examples: payload.examples,
      isInitialized: true,
    }),
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
