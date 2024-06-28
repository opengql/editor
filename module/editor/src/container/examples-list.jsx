import React, { useCallback } from 'react';
import css from '$editor/container/style/examples-list.module.css';
import { ExamplesListElement } from '$editor/component/examples-list-element';
import { SpinnerIcon } from '$editor/icon/spinner-icon';
import { useDispatch } from 'react-redux';
import { ParseState } from '$editor/const/parse-state';
import { editorActions } from '$editor/store/slice/editor-slice';
import { useNavigate } from 'react-router-dom';
import { useGrammar } from '$editor/hook/grammar';
import { If } from '$editor/component/if';
import { useExamplesSearchResult } from '$editor/store/hook/examples-search';
import { useEditorState } from '$editor/store/hook/editor';

/***
 * Container which reads the current grammar examples and renders them in form list.
 * If grammar is not initialized, yet it should show the centered spinner instead of empty list.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ExamplesList = () => {
  const result = useExamplesSearchResult();
  const loadingStatus = useEditorState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const grammar = useGrammar();

  const handleExampleClick = useCallback(
    (example) => {
      window.scrollTo(0, 0);
      dispatch(editorActions.setValue(example.code));
      navigate('/');
    },
    [navigate],
  );

  return (
    <>
      <If condition={loadingStatus === ParseState.INITIALIZING}>
        <div className={css.examplesLoadingWrapper} data-testid="ti-loading-examples-wrapper">
          <SpinnerIcon testId="ti-loading-examples" width="64" height="64" />
        </div>
      </If>
      <If condition={loadingStatus !== ParseState.INITIALIZING}>
        <ul className={css.examplesList} data-testid="ti-examples-list">
          {result.map((example, index) => (
            <ExamplesListElement
              key={`example-${index + 1}`}
              example={example}
              grammar={grammar}
              onShowInEditorClick={(example) => handleExampleClick(example)}
            />
          ))}
        </ul>
      </If>
    </>
  );
};
