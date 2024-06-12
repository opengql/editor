import { configureStore } from '@reduxjs/toolkit';
import { editorReducer } from '$editor/store/slice/editor-slice';
import { caretDataReducer } from '$editor/store/slice/caret-data-slice';
import { viewReducer } from '$editor/store/slice/view-slice';
import { parseResultReducer } from '$editor/store/slice/parse-result-slice';
import { languageReducer } from '$editor/store/slice/language-slice';
import { exampleSearchReducer } from '$editor/store/slice/examples-search-slice';

export const appStore = configureStore({
  reducer: {
    caretData: caretDataReducer,
    editor: editorReducer,
    examplesSearch: exampleSearchReducer,
    language: languageReducer,
    parserResult: parseResultReducer,
    view: viewReducer,
  },
});
