import { createSlice } from '@reduxjs/toolkit';
import { CodeEditorViewType } from '$editor/component/const/code-editor-view-type';

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    type: CodeEditorViewType.EDITOR,
  },
  reducers: {
    changeView: (state, { payload }) => ({
      ...state,
      type: payload,
    }),
  },
});

export const viewActions = viewSlice.actions;
export const viewReducer = viewSlice.reducer;
