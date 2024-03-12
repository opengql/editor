import React from 'react';
import { createMemoryRouter, MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const routerRender = (component, route = '/') =>
  render(React.createElement(MemoryRouter, { initialEntries: [route] }, component));

const createRouteElement = (route, component) => {
  const routeBody = React.createElement('h1', { 'data-testid': 'ti-header', key: 'body' }, route);
  const componentBody = React.createElement(component, { key: 'component' });
  return React.createElement('div', {}, [routeBody, componentBody]);
};

export const routerWithPathsRender = (component, routes) => {
  const mappedRoutes = routes.map((route) => ({
    path: route,
    element: createRouteElement(route, component),
  }));

  const router = createMemoryRouter(mappedRoutes);
  render(React.createElement(MemoryRouter, { router }));
};
