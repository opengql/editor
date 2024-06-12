import { createSlice } from '@reduxjs/toolkit';

const caretDataSlice = createSlice({
  name: 'caret-data',
  initialState: {
    position: {
      x: 0,
      y: 0,
    },
    index: 0,
    nextIndex: -1,
  },
  reducers: {
    update: (state, { payload }) => {
      const caretIndex = payload.selectionStart;
      const linesInTextArea = payload.value.substring(0, caretIndex).split('\n');
      const x = linesInTextArea.length;
      const y = linesInTextArea[linesInTextArea.length - 1].length;

      return {
        ...state,
        position: { x, y },
        index: caretIndex,
      };
    },
    updateNextIndex: (state, { payload }) => ({
      ...state,
      nextIndex: payload,
    }),
  },
});

export const caretDataActions = caretDataSlice.actions;
export const caretDataReducer = caretDataSlice.reducer;
