import React from 'react';
import { AppContainer } from '$editor/component/app-container';
import { ExamplesList } from '$editor/container/examples-list';
import { ExamplesSearch } from '$editor/container/examples-search';
import css from '$editor/page/style/examples-page.module.css';

/***
 * Page that renders the examples of selected grammar.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ExamplesPage = () => (
  <AppContainer>
    <div className={css.examplesPageWrapper}>
      <ExamplesSearch />
      <ExamplesList />
    </div>
  </AppContainer>
);
