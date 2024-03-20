import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Provider } from 'react-redux';
import { appStore } from './state/app-store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { EditorPage } from './page/editor-page';
import { ExamplesPage } from './page/examples-page';
import { useParsing } from './hook/parsing';

const router = createMemoryRouter([
  {
    path: '/',
    element: <EditorPage />,
  },
  {
    path: '/examples',
    element: <ExamplesPage />,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error(`Element with id='root' not found!`);
}

const root = createRoot(rootElement);

const App = () => {
  useParsing();

  return <RouterProvider router={router}></RouterProvider>;
};

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>,
);
