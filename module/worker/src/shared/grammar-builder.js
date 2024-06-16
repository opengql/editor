import { SyntaxType } from '$worker/shared/const/syntax-type';

const UNICODE_ESCAPED_CHAR_REGEX = /\\\\u/g;
const CONTAINS_LETTERS_REGEX = /[a-zA-Z]/;
const REGEX_SPEC_CHARS_REGEX = /[.*+\-?^${}()|[\]\\]/g;
const ESCAPED_CHAR_PATTERN = '\\$&';
const REGEX_ALT_SEPARATOR = '|';

const getOnlyStringsFromArray = (array) =>
  array
    .filter((potentialString) => potentialString !== undefined && potentialString !== '')
    .map((potentialString) => potentialString ?? '')
    .map((potentialString) => potentialString.replace(/'/g, ''));

const escapeLiteral = (literal) => {
  const charIndexStr = literal.replace('\\\\u', '');
  const charIndex = parseInt(charIndexStr, 16);
  return String.fromCharCode(charIndex).trim();
};

export class GrammarBuilder {
  withName = (name) => {
    this.name = name;
    return this;
  };

  withDataFromAntlr = (literalNames) => {
    const possibleSpecialWords = getOnlyStringsFromArray(literalNames);

    const keywords = [...possibleSpecialWords]
      .filter((literal) => !UNICODE_ESCAPED_CHAR_REGEX.test(literal))
      .filter((literal) => CONTAINS_LETTERS_REGEX.test(literal))
      .map((char) => char.replace(REGEX_SPEC_CHARS_REGEX, ESCAPED_CHAR_PATTERN));

    console.log(literalNames);

    this.keywords.push(...keywords);

    const punctuation = [...possibleSpecialWords]
      .map((literal) => (literal.startsWith('\\\\u') ? escapeLiteral(literal) : literal))
      .filter((literal) => !CONTAINS_LETTERS_REGEX.test(literal))
      .map((char) => char.replace(REGEX_SPEC_CHARS_REGEX, ESCAPED_CHAR_PATTERN));

    const keywordsRegexString = keywords.join(REGEX_ALT_SEPARATOR);
    const punctuationRegexString = punctuation.join(REGEX_ALT_SEPARATOR);
    const keywordsRegex = new RegExp(`\\b(?:${keywordsRegexString})\\b`, 'gi').toString();
    const punctuationRegex = new RegExp(`[${punctuationRegexString}]`, 'g').toString();

    this.syntax.push(
      {
        pattern: {
          pattern: keywordsRegex,
          lookbehind: true,
          greedy: true,
        },
        syntaxType: SyntaxType.KEYWORD,
      },
      {
        pattern: {
          pattern: punctuationRegex,
          greedy: true,
        },
        syntaxType: SyntaxType.PUNCTUATION,
      },
    );

    return this;
  };

  withSyntaxObject = (syntaxObject) => {
    this.syntax.push(syntaxObject);
    return this;
  };

  build = () => ({
    name: this.name,
    keywords: this.keywords,
    syntax: this.syntax,
  });

  constructor() {
    this.name = '';
    this.syntax = [];
    this.keywords = [];
  }
}
