import { createSlice } from '@reduxjs/toolkit';

const parseResultSlice = createSlice({
  name: 'parse-result',
  initialState: {
    errors: [],
    tree: [],
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      errors: payload.errors,
      tree: payload.parseTree,
    }),
  },
});

export const parseResultActions = parseResultSlice.actions;
export const parseResultReducer = parseResultSlice.reducer;
