import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CodeEditorViewType } from '$editor/component/const/code-editor-view-type';
import { Tooltip } from '$editor/component/tooltip';
import { If } from '$editor/component/if';
import { Editor } from '$editor/container/editor';
import { ErrorList } from '$editor/container/error-list';
import { ParseTreeView } from '$editor/container/parse-tree-view';
import { caretDataActions } from '$editor/store/slice/caret-data-slice';
import { StatusBar } from '$editor/container/status-bar';
import css from '$editor/page/style/editor-page.module.css';
import { AppContainer } from '$editor/component/app-container';

const EditorPageImpl = ({ viewType, onUpdateCaretData }) => {
  useEffect(() => {
    if (viewType === CodeEditorViewType.PARSE_TREE) {
      return;
    }

    const textArea = document.getElementById('code-textarea--input');

    if (textArea === null) {
      return;
    }

    const selectionStart = textArea.selectionStart;
    const currentValue = textArea.value;
    const caretChange = () => onUpdateCaretData(selectionStart, currentValue);

    textArea.addEventListener('click', caretChange);
    textArea.addEventListener('contextmenu', caretChange);
    textArea.addEventListener('keypress', caretChange);

    return () => {
      textArea.removeEventListener('click', caretChange);
      textArea.removeEventListener('contextmenu', caretChange);
      textArea.removeEventListener('keypress', caretChange);
    };
  }, [viewType]);

  return (
    <AppContainer>
      <div className={css.editorPage} data-testid="ti-code-editor-column">
        <Tooltip />
        <If condition={viewType === CodeEditorViewType.EDITOR}>
          <>
            <Editor />
            <StatusBar />
            <ErrorList />
          </>
        </If>
        <If condition={viewType === CodeEditorViewType.PARSE_TREE}>
          <ParseTreeView />
        </If>
      </div>
    </AppContainer>
  );
};

EditorPageImpl.propTypes = {
  viewType: PropTypes.oneOf(Object.values(CodeEditorViewType)).isRequired,
  onUpdateCaretData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewType: state.view.type,
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateCaretData: (selectionStart, value) => dispatch(caretDataActions.update({ selectionStart, value })),
});

export const EditorPage = connect(mapStateToProps, mapDispatchToProps)(EditorPageImpl);
