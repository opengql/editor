import React from 'react';
import { IconProps } from '$editor/icon/type/icon-props';

export const ExamplesIcon = ({ width = 16, height = 16, testId = 'ti-icon' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    data-testid={testId}
    fill="currentColor"
    className="bi bi-check-circle-fill"
    viewBox="0 0 20 20"
  >
    <path xmlns="http://www.w3.org/2000/svg" d="M2 3h16v2H2V3zm0 4h16v2H2V7zm0 4h16v2H2v-2zm0 4h16v2H2v-2z" />
  </svg>
);

ExamplesIcon.propTypes = IconProps;
