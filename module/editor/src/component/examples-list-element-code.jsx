import React from 'react';
import parse from 'html-react-parser';
import { highlight } from 'prismjs';
import css from '$editor/component/style/examples-list-element-code.module.css';
import codeBlockCss from '$editor/component/style/code-block.module.css';
import codeLineCss from '$editor/component/style/code-line.module.css';
import PropTypes from 'prop-types';
import { CodeExampleShape } from '$editor/prop-type/code-example-shape';

const NEW_LINE = '\n';
const NODE_REGEX = /(<span[^>]*>)((.|\n)*?)(<\/span>)/gi;

/***
 * Component that renders example code block.
 * It should contain code example with proper syntax highlighting.
 * This block of code should not be editable.
 *
 * @param {CodeExample} example
 * @param {import('$editor/store/type/grammar.js').Grammar} grammar
 * @returns {JSX.Element}
 * @constructor
 */
export const ExamplesListElementCode = ({ example, grammar }) => {
  const assemblyLine = (line, index) => (
    <tr key={`example-code-line-${index}`} data-testid={`ti-code-line-${index}`}>
      <td className={codeLineCss.lineNumberCell}>{index + 1}</td>
      <td className={codeLineCss.codeLine}>{parse(line)}</td>
    </tr>
  );

  const splitMultilineNode = (match, openingTag, content, lastContentChar, closingTag) => {
    return content
      .split('\n')
      .map((lineContent) => `${openingTag}${lineContent}${closingTag}`)
      .join('\n');
  };

  const getCodeLines = (input) =>
    highlight(input, grammar, 'gql').replace(NODE_REGEX, splitMultilineNode).split(NEW_LINE).map(assemblyLine);

  return (
    <pre className={css.exampleCode} data-testid="ti-examples-list-item--code">
      <div className={codeBlockCss.highlightBackground}>
        <div className={codeBlockCss.highlightLineNumberBackground} />
        <div className={codeBlockCss.highlightLineBackground} />
      </div>
      <table className={codeBlockCss.table}>
        <tbody data-testid="ti-code-lines">{getCodeLines(example.code.trim())}</tbody>
      </table>
    </pre>
  );
};

ExamplesListElementCode.propTypes = {
  example: CodeExampleShape.isRequired,
  grammar: PropTypes.object.isRequired,
};
