import { IconProps } from '$editor/icon/type/icon-props';
import React from 'react';

export const EditorIcon = ({ width = 16, height = 16, testId = 'ti-icon' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    data-testid={testId}
    fill="currentColor"
    className="bi bi-check-circle-fill"
    viewBox="0 0 20 20"
  >
    <path xmlns="http://www.w3.org/2000/svg" d="M9 6l-4 4 4 4-1 2-6-6 6-6zm2 8l4-4-4-4 1-2 6 6-6 6z" />
  </svg>
);

EditorIcon.propTypes = IconProps;
