import React, { useCallback, useEffect, useState } from 'react';
import { highlight } from 'prismjs';
import css from './style/highlight.module.css';
import { SyntaxType } from '../../../worker/src/const/syntax-type';
import { useSelector } from 'react-redux';
import { CodeBlock } from '../component/code-block';

const NEW_LINE = '\n';
const NODE_REGEX = /(<span[^>]*>)((.|\n)*?)(<\/span>)/gi;

const cssClassNames = {
  [SyntaxType.KEYWORD]: css.keyword,
  [SyntaxType.PUNCTUATION]: css.punctuation,
  [SyntaxType.COMMENT]: css.comment,
  [SyntaxType.STRING]: css.string,
  [SyntaxType.BOOLEAN]: css.boolean,
  [SyntaxType.NUMBER]: css.number,
  [SyntaxType.CUSTOM1]: css.custom1,
  [SyntaxType.CUSTOM2]: css.custom2,
  [SyntaxType.CUSTOM3]: css.custom3,
  [SyntaxType.CUSTOM4]: css.custom4,
};

export const useHighlights = () => {
  const grammarDefinition = useSelector((state) => state.language.grammarDefinition);
  const parserErrors = useSelector((state) => state.parserResult.errors);
  const [grammar, setGrammar] = useState({});

  const parseRegExp = (regexpStr) => {
    const patternRegex = /\/(.+)\/([a-z]*)/;
    const matches = regexpStr.match(patternRegex);

    if (!matches || matches.length < 3) {
      throw new Error('Invalid regex pattern');
    }

    return [matches[1], matches[2]];
  };

  const extractPattern = (syntaxObject) => {
    if (syntaxObject === undefined) {
      return;
    }

    const syntaxObjectIdentifier = cssClassNames[syntaxObject.syntaxType];

    let pattern;

    if (Array.isArray(syntaxObject.pattern)) {
      pattern = syntaxObject.pattern.map((syntaxToken) => {
        const [patternStr, flags] = parseRegExp(syntaxToken.pattern);

        return {
          pattern: new RegExp(patternStr, flags),
          greedy: syntaxToken.greedy,
          lookbehind: syntaxToken.lookbehind,
        };
      });
    } else {
      const [patternStr, flags] = parseRegExp(syntaxObject.pattern.pattern);

      pattern = {
        pattern: new RegExp(patternStr, flags),
        greedy: syntaxObject.pattern.greedy,
        lookbehind: syntaxObject.pattern.lookbehind,
      };
    }

    return [syntaxObjectIdentifier, pattern];
  };

  useEffect(() => {
    if (grammarDefinition === undefined) {
      return;
    }

    const syntax = grammarDefinition.syntax ?? [];
    const languageGrammar = syntax.map(extractPattern).reduce((acc, [id, pattern]) => ({ ...acc, [id]: pattern }), {});
    setGrammar(languageGrammar);
  }, [grammarDefinition]);

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
