import React from 'react';
import css from './style/spinner-icon.module.css';
import { IconProps } from '$editor/icon/type/icon-props';

export const SpinnerIcon = ({ width = 16, height = 16, testId = 'ti-icon' }) => (
  <div className={css.spinnerIcon}>
    <svg
      id="loading-spinner"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      data-testid={testId}
      viewBox="0 0 48 48"
    >
      <g fill="none">
        <path
          id="track"
          fill="#C6CCD2"
          d="M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z M24,44 C35.045695,44 44,35.045695 44,24 C44,12.954305 35.045695,4 24,4 C12.954305,4 4,12.954305 4,24 C4,35.045695 12.954305,44 24,44 Z"
        />
        <path
          id="section"
          fill="#3F4850"
          d="M24,0 C37.254834,0 48,10.745166 48,24 L44,24 C44,12.954305 35.045695,4 24,4 L24,0 Z"
        />
      </g>
    </svg>
  </div>
);

SpinnerIcon.propTypes = IconProps;
