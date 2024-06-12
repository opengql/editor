import React, { useCallback } from 'react';
import css from '$editor/container/style/view-select.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewActions } from '$editor/store/slice/view-slice';
import { CodeEditorViewType } from '$editor/component/const/code-editor-view-type';
import { EditorIcon } from '$editor/icon/editor-icon';
import { ParseTreeIcon } from '$editor/icon/parse-tree-icon';

const ViewSelectImpl = ({ viewType, onViewSelectChange }) => {
  const getClassName = useCallback(
    (currentViewType) =>
      viewType === currentViewType ? `${css.selectOption} ${css.selectedOption}` : css.selectOption,
    [viewType],
  );

  return (
    <div className={css.viewSelect} data-testid="ti-view-select--wrapper">
      <button
        onClick={() => onViewSelectChange(CodeEditorViewType.EDITOR)}
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
        onClick={() => onViewSelectChange(CodeEditorViewType.PARSE_TREE)}
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

ViewSelectImpl.propTypes = {
  viewType: PropTypes.oneOf(Object.values(CodeEditorViewType)).isRequired,
  onViewSelectChange: PropTypes.func.isRequired,
};

const mapStateToAction = (state) => ({
  viewType: state.view.type,
});

const mapActionToCallback = (dispatch) => ({
  onViewSelectChange: (viewType) => dispatch(viewActions.changeView(viewType)),
});

export const ViewSelect = connect(mapStateToAction, mapActionToCallback)(ViewSelectImpl);
