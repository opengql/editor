import React, { useEffect } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editorActions } from '$editor/store/slice/editor-slice';
import { useHighlights } from '$editor/hook/highlights';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';
import { Autocomplete } from '$editor/container/autocomplete';
import css from '$editor/container/style/editor.module.css';
import { useEditorTextArea } from '$editor/hook/editor-text-area';
import { useCodeLoader } from '$editor/hook/code-loader';

const EditorImpl = ({ value, nextCaretIndex, onValueChange, updateCaretData, updateNextCaretIndex }) => {
  const loadedCode = useCodeLoader();
  const editorTextArea = useEditorTextArea();
  const { highlight } = useHighlights();

  const handleValueChange = (newValue) => {
    if (editorTextArea === undefined || value === newValue) {
      return;
    }

    const selectionStart = editorTextArea.selectionStart;
    const currentValue = editorTextArea.value;

    onValueChange(newValue);
    updateCaretData(selectionStart, currentValue);
  };

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
    updateCaretData(nextCaretIndex, editorTextArea.value);
    updateNextCaretIndex(-1);
  }, [editorTextArea, nextCaretIndex]);

  useEffect(() => {
    if (editorTextArea === undefined) {
      return;
    }

    const selectionStart = editorTextArea.selectionStart;
    const currentValue = editorTextArea.value;

    updateCaretData(selectionStart, currentValue);
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

EditorImpl.propTypes = {
  value: PropTypes.string.isRequired,
  nextCaretIndex: PropTypes.number.isRequired,
  onValueChange: PropTypes.func.isRequired,
  updateCaretData: PropTypes.func.isRequired,
  updateNextCaretIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  value: state.editor.value,
  nextCaretIndex: state.caretData.nextIndex,
});

const mapDispatchToProps = (dispatch) => ({
  onValueChange: (value) => dispatch(editorActions.setValue(value)),
  updateCaretData: (selectionStart, value) => dispatch(caretDataActions.update({ selectionStart, value })),
  updateNextCaretIndex: (index) => dispatch(caretDataActions.updateNextIndex(index)),
});

export const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorImpl);
