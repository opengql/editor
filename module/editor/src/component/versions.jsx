import React from 'react';
import css from './style/versions.module.css';

export const Versions = () => (
  <div className={css.versionsWrapper}>
    <div className={css.versionElement}>
      <div className={css.versionElementLabel}>App Version</div>
      <div className={css.versionElementVersion}>{editor.VERSION}</div>
    </div>
    <div className={css.versionElement}>
      <div className={css.versionElementLabel}>Grammar Version</div>
      <div className={css.versionElementVersion}>{editor.VERSION}</div>
    </div>
  </div>
);
