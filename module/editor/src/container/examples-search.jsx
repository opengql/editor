import { useDispatch } from 'react-redux';
import css from '$editor/container/style/examples-search.module.css';
import React, { useCallback, useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { exampleSearchActions } from '$editor/store/slice/examples-search-slice';
import { useLanguageCurrentGrammar } from '$editor/store/hook/language';
import { useExamplesSearchOptions, useExamplesSearchPhrase } from '$editor/store/hook/examples-search';

/***
 * Container that renders the input for examples search.
 * It uses the fuse.js to perform the search on examples.
 * This component updates the application state explicitly.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ExamplesSearch = () => {
  const { examples } = useLanguageCurrentGrammar();
  const options = useExamplesSearchOptions();
  const phrase = useExamplesSearchPhrase();
  const dispatch = useDispatch();

  const [fuse, setFuse] = useState(new Fuse([], options));

  const searchForExamples = useCallback((pattern) => fuse.search(pattern).map((result) => result.item), [fuse]);

  useEffect(() => {
    setFuse(new Fuse(examples, options));

    if (phrase === '') {
      dispatch(exampleSearchActions.setResult(examples));
      return;
    }

    dispatch(exampleSearchActions.setResult(searchForExamples(phrase)));
  }, [examples, phrase, options]);

  return (
    <input
      type="text"
      className={css.examplesSearch}
      placeholder="Search..."
      onChange={(event) => dispatch(exampleSearchActions.setPhrase(event.target.value))}
      data-testid="ti-examples-search-input"
    />
  );
};
