import React from 'react';
import css from './style/examples-list.module.css';
import { ExamplesListElement } from '../component/examples-list-element';
import { SpinnerIcon } from '../icon/spinner-icon';
import PropTypes from 'prop-types';
import { CodeExample } from '../type/code-example';
import { connect } from 'react-redux';
import { ParseState } from '../const/parse-state';
import { editorActions } from '../state/slice/editor-slice';
import { useNavigate } from 'react-router-dom';
import { useGrammar } from '../hook/grammar';
import { If } from '../component/if';

const ExamplesListImpl = ({ result, isLoading, setEditorValue }) => {
  const navigate = useNavigate();
  const grammar = useGrammar();

  const handleExampleClick = (example) => {
    window.scrollTo(0, 0);
    setEditorValue(example.code);
    navigate('/');
  };

  return (
    <>
      <If condition={isLoading}>
        <div className={css.examplesLoadingWrapper} data-testid="ti-loading-examples-wrapper">
          <SpinnerIcon testId="ti-loading-examples" width="64" height="64" />
        </div>
      </If>
      <If condition={!isLoading}>
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

ExamplesListImpl.propTypes = {
  result: PropTypes.arrayOf(CodeExample).isRequired,
  isLoading: PropTypes.bool.isRequired,
  setEditorValue: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  result: state.examplesSearch.result,
  options: state.examplesSearch.options,
  isLoading: state.editor.state === ParseState.INITIALIZING,
});

const mapDispatchToProps = (dispatch) => ({
  setEditorValue: (value) => dispatch(editorActions.setValue(value)),
});

export const ExamplesList = connect(mapStateToProps, mapDispatchToProps)(ExamplesListImpl);
