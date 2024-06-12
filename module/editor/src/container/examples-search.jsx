import { connect } from 'react-redux';
import css from '$editor/container/style/examples-search.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import { CodeExample } from '$editor/type/code-example';
import { ParseState } from '$editor/const/parse-state';
import { exampleSearchActions } from '$editor/store/slice/examples-search-slice';

const ExamplesSearchImpl = ({ examples, options, phrase, setPhrase, setResult }) => {
  const [fuse, setFuse] = useState(new Fuse([], options));

  const searchForExamples = useCallback((pattern) => fuse.search(pattern).map((result) => result.item), [fuse]);

  useEffect(() => {
    setFuse(new Fuse(examples, options));

    if (phrase === '') {
      setResult(examples);
      return;
    }

    setResult(searchForExamples(phrase));
  }, [examples, phrase]);

  return (
    <input
      type="text"
      className={css.examplesSearch}
      placeholder="Search..."
      onChange={(event) => setPhrase(event.target.value)}
      data-testid="ti-examples-search-input"
    />
  );
};

ExamplesSearchImpl.propTypes = {
  examples: PropTypes.arrayOf(CodeExample).isRequired,
  options: PropTypes.object.isRequired,
  phrase: PropTypes.string.isRequired,
  setPhrase: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  examples: state.language.examples,
  options: state.examplesSearch.options,
  phrase: state.examplesSearch.phrase,
  isLoading: state.editor.state === ParseState.INITIALIZING,
});

const mapDispatchToProps = (dispatch) => ({
  setPhrase: (value) => dispatch(exampleSearchActions.setPhrase(value)),
  setResult: (value) => dispatch(exampleSearchActions.setResult(value)),
});

export const ExamplesSearch = connect(mapStateToProps, mapDispatchToProps)(ExamplesSearchImpl);
