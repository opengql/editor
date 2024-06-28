import React, { useCallback, useEffect } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import { useDispatch } from 'react-redux';
import { editorActions } from '$editor/store/slice/editor-slice';
import { useHighlights } from '$editor/hook/highlights';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';
import { Autocomplete } from '$editor/container/autocomplete';
import css from '$editor/container/style/editor.module.css';
import { useEditorTextArea } from '$editor/hook/editor-text-area';
import { useCodeLoader } from '$editor/hook/code-loader';
import { useEditorValue } from '$editor/store/hook/editor';
import { useCaretNextIndex } from '$editor/store/hook/caret-data';

/***
 * Container that implements base editor rendering.
 * It reads current value and caret data from application state and put it's in the rendered text editor.
 * Also, this component is rendering the autocomplete container with proper style overlapping.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Editor = () => {
  const value = useEditorValue();
  const nextCaretIndex = useCaretNextIndex();
  const dispatch = useDispatch();

  const loadedCode = useCodeLoader();
  const editorTextArea = useEditorTextArea();
  const { highlight } = useHighlights();

  /***
   * Method that handles the editor value change and update of the application state.
   *
   * @type {(function(newValue?: string): void)}
   */
  const handleValueChange = useCallback(
    (newValue) => {
      if (editorTextArea === undefined || value === newValue) {
        return;
      }

      const selectionStart = editorTextArea.selectionStart;
      const currentValue = editorTextArea.value;

      dispatch(editorActions.setValue(newValue));
      dispatch(caretDataActions.update({ selectionStart, value: currentValue }));
    },
    [editorTextArea, value],
  );

  useEffect(() => {
    if (loadedCode === undefined) {
      return;
    }

    handleValueChange(loadedCode);
  }, [loadedCode]);

  useEffect(() => {
    if (nextCaretIndex === -1 || editorTextArea === undefined) {
      return;
    }

    editorTextArea.setSelectionRange(nextCaretIndex, nextCaretIndex);
    dispatch(caretDataActions.update({ selectionStart: nextCaretIndex, value: editorTextArea.value }));
    dispatch(caretDataActions.updateNextIndex(-1));
  }, [editorTextArea, nextCaretIndex]);

  useEffect(() => {
    if (editorTextArea === undefined) {
      return;
    }

    const selectionStart = editorTextArea.selectionStart;
    const currentValue = editorTextArea.value;

    dispatch(caretDataActions.update({ selectionStart, value: currentValue }));
  }, []);

  return (
    <>
      <div className={css.editorWrapper} data-testid="ti-code-editor-wrapper">
        <SimpleCodeEditor
          value={value}
          onValueChange={handleValueChange}
          highlight={highlight}
          padding={0}
          textareaId="code-textarea--input"
          textareaClassName={css.codeArea}
          className={css.editor}
          autoFocus
        />
      </div>
      <Autocomplete />
    </>
  );
};
