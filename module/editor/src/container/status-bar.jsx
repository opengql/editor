import React from 'react';
import css from '$editor/container/style/status-bar.module.css';
import { CaretData } from '$editor/component/caret-data';
import { ParseStateIndicator } from '$editor/component/parse-state-indicator';
import { useParserResultErrors } from '$editor/store/hook/parser-result';
import { useEditorState } from '$editor/store/hook/editor';
import { useCaretPosition } from '$editor/store/hook/caret-data';

/***
 * Container that renders the status of parsing and caret position from the application state.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const StatusBar = () => {
  const parseErrors = useParserResultErrors();
  const parseState = useEditorState();
  const caretPosition = useCaretPosition();

  return (
    <div className={css.statusBar} data-testid="ti-status-bar">
      <ParseStateIndicator parseErrors={parseErrors} parseState={parseState} />
      <div className={css.statusBarSeparator} />
      <CaretData position={caretPosition} />
    </div>
  );
};
