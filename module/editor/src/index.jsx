import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { Provider } from 'react-redux';
import { appStore } from './state/app-store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EditorPage } from './page/editor-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EditorPage />,
  },
]);

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error(`Element with id='root' not found!`);
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
);
