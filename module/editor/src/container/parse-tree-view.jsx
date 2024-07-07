import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import css from '$editor/container/style/parse-tree.module.css';
import { useParseTreeConverter } from '$editor/hook/parse-tree-converter';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { ParseState } from '$editor/const/parse-state';
import { ParseTreeViewOptions } from '$editor/component/const/parse-tree-view-options';
import { useParserResultTree } from '$editor/store/hook/parser-result';
import { useEditorState } from '$editor/store/hook/editor';

export const ParseTreeView = () => {
  const state = useEditorState();
  const tree = useParserResultTree();

  const containerRef = useRef(null);
  const networkRef = useRef(null);
  const { isConverting, convertResult } = useParseTreeConverter(tree);

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
  }, [state, convertResult]);

  return (
    <div className={css.parseTree}>
      <div
        className={css.parseTreeLoadingWrapper}
        style={{ display: state !== ParseState.IDLE || isConverting ? 'inherit' : 'none' }}
      >
        <SpinnerIcon testId="ti-loading-parse-tree" width="64" height="64" />
      </div>
      <div
        ref={containerRef}
        className={css.parseTreeView}
        data-testid="ti-parse-tree--container"
        style={{ display: state !== ParseState.IDLE || isConverting ? 'none' : 'inherit' }}
      />
    </div>
  );
};
