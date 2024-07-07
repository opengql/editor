import { IconProps } from '$editor/icon/type/icon-props';
import React from 'react';

export const ParseTreeIcon = ({ width = 16, height = 16, testId = 'ti-icon' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    data-testid={testId}
    fill="currentColor"
    className="bi bi-check-circle-fill"
    viewBox="0 0 48 48"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M44,32H42V24a2,2,0,0,0-2-2H26V20h0V16h2a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2H20a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h2v6H8a2,2,0,0,0-2,2v8H4a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34a2,2,0,0,0-2-2H10V26H22v6H20a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34a2,2,0,0,0-2-2H26V26H38v6H36a2,2,0,0,0-2,2v8a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2V34A2,2,0,0,0,44,32Z"
    />
  </svg>
);

ParseTreeIcon.propTypes = IconProps;
