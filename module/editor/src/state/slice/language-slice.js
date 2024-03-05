import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    grammarDefinition: {},
    examples: [],
  },
  reducers: {
    initialize: (state, { payload }) => {
      console.log(payload);
      return {
        grammarDefinition: payload.grammarDefinition,
        examples: payload.examples,
      };
    },
  },
});

export const languageActions = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
