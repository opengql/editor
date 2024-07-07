import React from 'react';
import css from '$editor/component/style/versions.module.css';

/***
 * Component that renders information about current application version and the grammar version.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Versions = () => (
  <div className={css.versionsWrapper} data-testid="ti-versions">
    <div className={css.versionElement}>
      <div className={css.versionElementLabel}>App Version</div>
      <div className={css.versionElementVersion} data-testid="ti-editor-version-label">
        {editor.VERSION}
      </div>
    </div>
    <div className={css.versionElement}>
      <div className={css.versionElementLabel}>Grammar Version</div>
      <div className={css.versionElementVersion} data-testid="ti-grammar-version-label">
        {grammar.VERSION}
      </div>
    </div>
  </div>
);
