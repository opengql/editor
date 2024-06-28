import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { useViewType } from '$editor/store/hook/view';

/***
 * Page that renders the editor and parse tree view.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const EditorPage = () => {
  const viewType = useViewType();
  const dispatch = useDispatch();

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
    const caretChange = () => dispatch(caretDataActions.update({ selectionStart, value: currentValue }));

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
