import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { Editor } from '$editor/container/editor';
import { editorActions } from '$editor/store/slice/editor-slice';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';
import { languageActions } from '$editor/store/slice/language-slice';
import { storeRender } from '$editor-test/helper/store-render';

describe('Editor', () => {
  const initialState = {
    editor: { value: 'initial value' },
    caretData: { nextIndex: -1 },
    language: {
      selectedGrammar: 'DEFAULT',
      grammars: {
        DEFAULT: { name: 'DEFAULT', grammarDefinition: { keywords: ['apple', 'banana', 'cherry'] }, examples: [] },
      },
      isFetched: false,
      isInitialized: false,
    },
  };

  const initializeStore = (store, state) => {
    act(() => {
      store.dispatch(editorActions.setValue(state.editor.value));
      store.dispatch(languageActions.initializeAfterFetching({ grammars: state.language.grammars }));
      store.dispatch(caretDataActions.update({ selectionStart: 5, value: state.editor.value }));
    });
  };

  const renderEditor = (state = initialState) => {
    const result = storeRender(<Editor />);

    act(() => initializeStore(result.store, state));

    const rerender = () => result.rerender(<Editor />);

    return { ...result, rerender };
  };

  it('should render editor with value provided in store', () => {
    renderEditor();

    const editorWrapper = screen.getByTestId('ti-code-editor-wrapper');
    const textarea = screen.getByRole('textbox');

    expect(editorWrapper).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('initial value');
  });

  it('should update state after changed value in editor', () => {
    const { store } = renderEditor();

    const textarea = screen.getByRole('textbox');
    const valueToInsert = 'updated value';

    act(() => fireEvent.change(textarea, { target: { value: valueToInsert } }));

    const stateValue = store.getState().editor.value;

    expect(stateValue).toEqual(valueToInsert);
  });

  it('should update cared data on editor value change', () => {
    const { store } = renderEditor();

    const textarea = screen.getByRole('textbox');

    const initCaretData = store.getState().caretData;

    act(() => fireEvent.change(textarea, { target: { value: 'updated value' } }));

    const updatedCaretData = store.getState().caretData;

    expect(initCaretData).not.toBe(updatedCaretData);
  });

  it('should set the selection range and updates caret data when nextCaretIndex changes', () => {
    const { store } = renderEditor();

    const initCaretData = store.getState().caretData;

    act(() => store.dispatch(caretDataActions.updateNextIndex(5)));

    const textarea = screen.getByRole('textbox');

    expect(textarea.selectionStart).toBe(5);
    expect(textarea.selectionEnd).toBe(5);

    const caretData = store.getState().caretData;

    expect(caretData).not.toBe(initCaretData);
    expect(caretData).toEqual({
      index: 5,
      nextIndex: -1,
      position: {
        x: 1,
        y: 5,
      },
    });
  });
});
