import React from 'react';
import css from '$editor/container/style/examples-list.module.css';
import { ExamplesListElementCode } from '$editor/component/examples-list-element-code';
import { CodeExample } from '$editor/type/code-example';
import PropTypes from 'prop-types';

export const ExamplesListElement = ({ example, grammar, onShowInEditorClick }) => (
  <li className={css.example} onClick={() => onShowInEditorClick(example)} data-testid="ti-examples-list-item">
    <div className={css.exampleHeader} data-testid="ti-examples-list-item--title">
      {example.name}
    </div>
    <ExamplesListElementCode example={example} grammar={grammar} />
  </li>
);

ExamplesListElement.propTypes = {
  example: CodeExample.isRequired,
  grammar: PropTypes.object.isRequired,
  onShowInEditorClick: PropTypes.func.isRequired,
};
