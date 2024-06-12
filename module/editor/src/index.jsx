import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '$editor/styles.css';
import { Provider } from 'react-redux';
import { appStore } from '$editor/store/app-store';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { EditorPage } from '$editor/page/editor-page';
import { ExamplesPage } from '$editor/page/examples-page';
import { useParsing } from '$editor/hook/parsing';

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
