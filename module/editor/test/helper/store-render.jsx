import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { appStore } from '../../src/state/app-store';
import { MemoryRouter } from 'react-router-dom';

export const storeRender = (component) => {
  const renderResult = render(<Provider store={appStore}>{component}</Provider>);
  const rerender = (component) => renderResult.rerender(<Provider store={appStore}>{component}</Provider>);
  return { ...renderResult, rerender, store: appStore };
};

export const storeRouterRender = (component, { routes, init } = {}) => {
  const initialEntries = routes ?? ['/', '/examples'];
  const initialIndex = init ?? 0;

  const renderResult = render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Provider store={appStore}>{component}</Provider>
    </MemoryRouter>,
  );

  const rerender = (component, { routes, init } = {}) => {
    const initialEntries = routes ?? ['/', '/examples'];
    const initialIndex = init ?? 0;

    renderResult.rerender(
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        <Provider store={appStore}>{component}</Provider>
      </MemoryRouter>,
    );
  };

  return { ...renderResult, rerender, store: appStore };
};
