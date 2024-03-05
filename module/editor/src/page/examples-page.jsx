import React from 'react';
import { AppContainer } from '../component/app-container';
import { ExamplesList } from '../container/examples-list';
import { ExamplesSearch } from '../container/examples-search';
import css from './style/examples-page.module.css';

export const ExamplesPage = () => (
  <AppContainer>
    <div className={css.examplesPageWrapper}>
      <ExamplesSearch />
      <ExamplesList />
    </div>
  </AppContainer>
);
