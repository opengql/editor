import React, { useCallback } from 'react';
import { highlight } from 'prismjs';
import css from '$editor/hook/style/highlight.module.css';
import { useSelector } from 'react-redux';
import { CodeBlock } from '$editor/component/code-block';
import { useGrammar } from '$editor/hook/grammar';

const NEW_LINE = '\n';
const NODE_REGEX = /(<span[^>]*>)((.|\n)*?)(<\/span>)/gi;

/***
 * Hook that provides abilities to highlight the provided input.
 * It uses prismjs under the hood.
 *
 * @returns {{highlight: (...args: any[]) => any, grammar: {}}}
 */
export const useHighlights = () => {
  const parserErrors = useSelector((state) => state.parserResult.errors);

  const grammar = useGrammar();

  /***
   * Method that fix problem with multiline not split in generated code highlight.
   *
   * @param {string} match
   * @param {string} openingTag
   * @param {string} content
   * @param {string} lastContentChar
   * @param {string} closingTag
   * @returns {string}
   */
  const splitMultilineNode = (match, openingTag, content, lastContentChar, closingTag) =>
    content
      .split(NEW_LINE)
      .map((lineContent) => `${openingTag}${lineContent}${closingTag}`)
      .join(NEW_LINE);

  /***
   * Method that converts the provided string code to the React code.
   * It applies the language syntax with usage of prismjs and also fixes some problems the prism is not handling.
   *
   * @type {(code: string) => JSX.Element}
   */
  const highlightCallback = useCallback(
    (code) => {
      const highlightResult = highlight(code, grammar, 'lang')
        .replace(NODE_REGEX, splitMultilineNode)
        .replaceAll('class="token', `class="${css.token}`)
        .split(NEW_LINE);

      return <CodeBlock highlightResult={highlightResult} parserErrors={parserErrors} />;
    },
    [grammar, parserErrors],
  );

  return {
    highlight: highlightCallback,
    grammar,
  };
};
