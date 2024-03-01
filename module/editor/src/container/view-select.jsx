import React, { useCallback } from 'react';
import css from './style/view-select.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { viewActions } from '../state/slice/view-slice';
import { CodeEditorViewType } from '../component/const/code-editor-view-type';
import { ParseTreeNode } from '../type/parse-tree-node';

const ViewSelectImpl = ({ viewType, parseTree, onViewSelectChange }) => {
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
        Editor
      </button>
      <button
        onClick={() => onViewSelectChange(CodeEditorViewType.PARSE_TREE)}
        className={getClassName(CodeEditorViewType.PARSE_TREE)}
        data-testid="ti-view-select--wrapper--parse-tree"
        disabled={parseTree.length === 0}
      >
        Parse Tree
      </button>
    </div>
  );
};

ViewSelectImpl.propTypes = {
  viewType: PropTypes.oneOf(Object.values(CodeEditorViewType)).isRequired,
  parseTree: PropTypes.arrayOf(ParseTreeNode).isRequired,
  onViewSelectChange: PropTypes.func.isRequired,
};

const mapStateToAction = (state) => ({
  viewType: state.view.type,
  parseTree: state.parserResult.tree,
});

const mapActionToCallback = (dispatch) => ({
  onViewSelectChange: (viewType) => dispatch(viewActions.changeView(viewType)),
});

export const ViewSelect = connect(mapStateToAction, mapActionToCallback)(ViewSelectImpl);
