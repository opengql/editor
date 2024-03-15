import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const routerRender = (component, { routes, init } = {}) => {
  const initialEntries = routes ?? ['/', '/examples'];
  const initialIndex = init ?? 0;

  const renderResult = render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      {component}
    </MemoryRouter>,
  );

  const rerender = (component, { routes, init } = {}) => {
    const initialEntries = routes ?? ['/', '/examples'];
    const initialIndex = init ?? 0;

    renderResult.rerender(
      <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
        {component}
      </MemoryRouter>,
    );
  };

  return { ...renderResult, rerender };
};
