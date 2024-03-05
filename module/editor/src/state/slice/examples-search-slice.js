import { createSlice } from '@reduxjs/toolkit';

const examplesSearchSlice = createSlice({
  name: 'examples-search',
  initialState: {
    options: {
      includeScore: false,
      shouldSort: true,
      keys: ['name', 'code'],
    },
    phrase: '',
    result: [],
  },
  reducers: {
    setPhrase: (state, { payload }) => ({
      ...state,
      phrase: payload,
    }),
    setResult: (state, { payload }) => ({
      ...state,
      result: payload,
    }),
  },
});

export const exampleSearchActions = examplesSearchSlice.actions;
export const exampleSearchReducer = examplesSearchSlice.reducer;
