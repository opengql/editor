import React, { useCallback } from 'react';
import { highlight } from 'prismjs';
import css from '$editor/hook/style/highlight.module.css';
import { useSelector } from 'react-redux';
import { CodeBlock } from '$editor/component/code-block';
import { useGrammar } from '$editor/hook/grammar';

const NEW_LINE = '\n';
const NODE_REGEX = /(<span[^>]*>)((.|\n)*?)(<\/span>)/gi;

export const useHighlights = () => {
  const parserErrors = useSelector((state) => state.parserResult.errors);

  const grammar = useGrammar();

  const splitMultilineNode = (match, openingTag, content, lastContentChar, closingTag) =>
    content
      .split(NEW_LINE)
      .map((lineContent) => `${openingTag}${lineContent}${closingTag}`)
      .join(NEW_LINE);

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
