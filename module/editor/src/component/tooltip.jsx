import css from '../container/style/code-editor.module.css';
import React from 'react';
import { ViewSelect } from '../container/view-select';
import { ShareButton } from '../container/share-button';

export const Tooltip = () => (
  <div className={css.editorTooltip} data-testid="ti-code-editor-toolbar">
    <ShareButton />
    <div className={css.editorTooltipSeparator} />
    <ViewSelect />
  </div>
);
