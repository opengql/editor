import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { mockNavigateFunc } from './mock-navigate';

const Renderer = ({ routes, initRoute }) => {
  const navigate = useNavigate();

  const [currentRoute, setCurrentRoute] = useState(initRoute);

  const getComponentToRender = useCallback(
    () => routes.find((route) => route.path === currentRoute)?.element ?? <h1>error</h1>,
    [currentRoute],
  );

  useEffect(
    () =>
      mockNavigateFunc.mockImplementation((path, ...other) => {
        console.log(path, ...other);
        setCurrentRoute(path);
      }),
    [],
  );

  useEffect(() => navigate(initRoute), [initRoute]);

  return (
    <>
      {getComponentToRender()}
      <h1 data-testid="ti-route-indicator">{currentRoute}</h1>
    </>
  );
};

Renderer.propTypes = {
  initRoute: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const TestRouter = ({ initRoute, routes }) => {
  const initialEntries = routes.map((route) => route.path);
  const initialIndex = routes.findIndex((route) => route.path === initRoute);

  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Renderer initRoute={initRoute} routes={routes} />
    </MemoryRouter>
  );
};

TestRouter.propTypes = {
  initRoute: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
