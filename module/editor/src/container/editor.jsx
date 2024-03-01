import React, { useCallback, useEffect, useState } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editorActions } from '../state/slice/editor-slice';
import { useHighlights } from '../hook/highlights';
import { caretDataActions } from '../state/slice/caret-data-slice';
import { Autocomplete } from './autocomplete';
import css from './style/editor.module.css';

const EditorImpl = ({ value, nextCaretIndex, onValueChange, updateCaretData, updateNextCaretIndex }) => {
  const [textArea, setTextArea] = useState(undefined);

  const { highlight } = useHighlights();

  const handleValueChange = (newValue) => {
    if (textArea === undefined || value === newValue) {
      return;
    }

    const selectionStart = textArea.selectionStart;
    const currentValue = textArea.value;

    onValueChange(newValue);
    updateCaretData(selectionStart, currentValue);
  };

  const handleSelectCapture = useCallback(() => {
    if (nextCaretIndex === -1 || textArea === undefined) {
      return;
    }

    textArea.setSelectionRange(nextCaretIndex, nextCaretIndex);
    updateNextCaretIndex(-1);
  }, [textArea, nextCaretIndex]);

  const handleSuggestionAccept = (suggestion, wordData) => {
    if (wordData === undefined) {
      return;
    }

    let tmpValue = value;

    if (wordData.startIndex !== -1) {
      const before = tmpValue.substring(0, wordData.startIndex);
      const after = tmpValue.substring(wordData.startIndex + wordData.length);
      tmpValue = `${before}${suggestion} ${after}`;
    }

    updateNextCaretIndex(wordData.startIndex + suggestion.length + 1);
    handleValueChange(tmpValue);
  };

  useEffect(() => {
    const tmpTextArea = document.getElementById('code-textarea--input');

    if (tmpTextArea === null) {
      return;
    }

    setTextArea(tmpTextArea);

    const selectionStart = tmpTextArea.selectionStart;
    const currentValue = tmpTextArea.value;

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
          onSelectCapture={handleSelectCapture}
          autoFocus
        />
      </div>
      <Autocomplete textAreaElement={textArea} onSuggestionAccept={handleSuggestionAccept} />
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
