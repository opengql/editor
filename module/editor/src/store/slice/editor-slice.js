import { createSlice } from '@reduxjs/toolkit';
import { ParseState } from '$editor/const/parse-state';

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    state: ParseState.IDLE,
    value: 'MATCH (p:Person)-[:LIVES_IN]->(c:City) RETURN p',
  },
  reducers: {
    setValue: (state, action) => ({
      ...state,
      value: action.payload,
    }),
    setState: (state, action) => ({
      ...state,
      state: action.payload,
    }),
  },
});

export const editorActions = editorSlice.actions;

export const editorReducer = editorSlice.reducer;
