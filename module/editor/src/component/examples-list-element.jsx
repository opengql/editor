import React from 'react';
import css from '$editor/container/style/examples-list.module.css';
import { ExamplesListElementCode } from '$editor/component/examples-list-element-code';
import PropTypes from 'prop-types';
import { CodeExampleShape } from '$editor/prop-type/code-example-shape';

/***
 * Component that renders single example element.
 * Such component contains the title and code display block.
 *
 * @param {CodeExample} example
 * @param {import('$editor/store/type/grammar.js').Grammar} grammar
 * @param {function} onShowInEditorClick
 * @returns {JSX.Element}
 * @constructor
 */
export const ExamplesListElement = ({ example, grammar, onShowInEditorClick }) => (
  <li className={css.example} onClick={() => onShowInEditorClick(example)} data-testid="ti-examples-list-item">
    <div className={css.exampleHeader} data-testid="ti-examples-list-item--title">
      {example.name}
    </div>
    <ExamplesListElementCode example={example} grammar={grammar} />
  </li>
);

ExamplesListElement.propTypes = {
  example: CodeExampleShape.isRequired,
  grammar: PropTypes.object.isRequired,
  onShowInEditorClick: PropTypes.func.isRequired,
};
