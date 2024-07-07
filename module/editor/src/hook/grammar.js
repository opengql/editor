import { useEffect, useState } from 'react';
import css from './style/highlight.module.css';
import { SyntaxType } from '$worker/shared/const/syntax-type';
import { useLanguageCurrentGrammar } from '$editor/store/hook/language';

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

/***
 * Hook that generates special grammar object with extra elements used by the highlight algorithm.
 *
 * @returns {{}}
 */
export const useGrammar = () => {
  const [grammar, setGrammar] = useState({});

  const { grammarDefinition } = useLanguageCurrentGrammar();

  /***
   * Method that takes the {@link RegExp} string and reverts the escape performed on worker side.
   * It throws 'Invalid regex pattern' when provided string is not a {@link RegExp} string.
   *
   * @param regexpStr
   * @returns {[string,string]}
   */
  const parseRegExp = (regexpStr) => {
    const patternRegex = /\/(.+)\/([a-z]*)/;
    const matches = regexpStr.match(patternRegex);

    if (!matches || matches.length < 3) {
      throw new Error('Invalid regex pattern');
    }

    return [matches[1], matches[2]];
  };

  /***
   *
   *
   * @param {SyntaxObject} syntaxObject
   * @returns {[string,{pattern: RegExp, greedy: boolean, lookbehind: boolean}][] | undefined}
   */
  const extractPattern = (syntaxObject) => {
    if (syntaxObject === undefined) {
      return undefined;
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

  return grammar;
};
