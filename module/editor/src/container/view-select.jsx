import React, { useCallback } from 'react';
import css from '$editor/container/style/view-select.module.css';
import { useDispatch } from 'react-redux';
import { viewActions } from '$editor/store/slice/view-slice';
import { CodeEditorViewType } from '$editor/component/const/code-editor-view-type';
import { EditorIcon } from '$editor/icon/editor-icon';
import { ParseTreeIcon } from '$editor/icon/parse-tree-icon';
import { useViewType } from '$editor/store/hook/view';

/***
 * Container that provide utility to switch between view types.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ViewSelect = () => {
  const viewType = useViewType();
  const dispatch = useDispatch();

  const getClassName = useCallback(
    (currentViewType) =>
      viewType === currentViewType ? `${css.selectOption} ${css.selectedOption}` : css.selectOption,
    [viewType],
  );

  return (
    <div className={css.viewSelect} data-testid="ti-view-select--wrapper">
      <button
        onClick={() => dispatch(viewActions.changeView(CodeEditorViewType.EDITOR))}
        className={getClassName(CodeEditorViewType.EDITOR)}
        data-testid="ti-view-select--editor-button"
      >
        <div className={css.selectOptionContentWrapper} data-testid={`ti-select-option--content`}>
          <div className={css.selectOptionIconWrapper} data-testid={`ti-select-option--btn-icon-left`}>
            <EditorIcon />
          </div>
          <div className={css.selectOptionLabelWrapper} data-testid={`ti-select-option--btn-label`}>
            Editor
          </div>
        </div>
      </button>
      <button
        onClick={() => dispatch(viewActions.changeView(CodeEditorViewType.PARSE_TREE))}
        className={getClassName(CodeEditorViewType.PARSE_TREE)}
        data-testid="ti-view-select--parse-tree"
      >
        <div className={css.selectOptionContentWrapper} data-testid={`ti-select-option--content`}>
          <div className={css.selectOptionIconWrapper} data-testid={`ti-select-option--btn-icon-left`}>
            <ParseTreeIcon />
          </div>
          <div className={css.selectOptionLabelWrapper} data-testid={`ti-select-option--btn-label`}>
            Parse Tree
          </div>
        </div>
      </button>
    </div>
  );
};
