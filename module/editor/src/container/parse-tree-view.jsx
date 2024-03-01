import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import css from './style/parse-tree.module.css';
import PropTypes from 'prop-types';
import { ParseTreeNode } from '../type/parse-tree-node';
import { useParseTreeConverter } from '../hook/parse-tree-converter';
import { SpinnerIcon } from '../icon/spinner-icon';
import { connect } from 'react-redux';
import { ParseState } from '../const/parse-state';
import { ParseTreeViewOptions } from '../component/const/parse-tree-view-options';

const ParseTreeViewImpl = ({ parseTree, isParsing }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const { isConverting, convertResult } = useParseTreeConverter(parseTree);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    networkRef.current?.destroy();

    const container = containerRef.current;
    const { nodes, edges } = convertResult;

    networkRef.current = new Network(container, { nodes, edges }, ParseTreeViewOptions);
    networkRef.current?.fit();
    networkRef.current?.redraw();

    return () => {
      networkRef.current?.destroy();
      networkRef.current = null;
    };
  }, [isParsing, convertResult]);

  return (
    <div className={css.parseTree}>
      <div className={css.parseTreeLoadingWrapper} style={{ display: isParsing || isConverting ? 'inherit' : 'none' }}>
        <SpinnerIcon testId="ti-loading-parse-tree" width="64" height="64" />
      </div>
      <div
        ref={containerRef}
        className={css.parseTreeView}
        data-testid="ti-parse-tree--container"
        style={{ display: isParsing || isConverting ? 'none' : 'inherit' }}
      />
    </div>
  );
};

ParseTreeViewImpl.propTypes = {
  isParsing: PropTypes.bool.isRequired,
  parseTree: PropTypes.arrayOf(ParseTreeNode),
};

const mapStateToProps = (state) => ({
  isParsing: state.editor.state === ParseState.PARSING,
  parseTree: state.parserResult.tree,
});

export const ParseTreeView = connect(mapStateToProps)(ParseTreeViewImpl);
