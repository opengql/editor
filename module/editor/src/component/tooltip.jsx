import css from '$editor/container/style/code-editor.module.css';
import React from 'react';
import { ViewSelect } from '$editor/container/view-select';
import { ShareButton } from '$editor/container/share-button';

export const Tooltip = () => (
  <div className={css.editorTooltip} data-testid="ti-code-editor-toolbar">
    <ShareButton />
    <div className={css.editorTooltipSeparator} />
    <ViewSelect />
  </div>
);
