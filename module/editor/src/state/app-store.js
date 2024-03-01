import { configureStore } from '@reduxjs/toolkit';
import { editorReducer } from './slice/editor-slice';
import { caretDataReducer } from './slice/caret-data-slice';
import { viewReducer } from './slice/view-slice';
import { parseResultReducer } from './slice/parse-result-slice';
import { languageReducer } from './slice/language-slice';

export const appStore = configureStore({
  reducer: {
    caretData: caretDataReducer,
    editor: editorReducer,
    language: languageReducer,
    parserResult: parseResultReducer,
    view: viewReducer,
  },
});
