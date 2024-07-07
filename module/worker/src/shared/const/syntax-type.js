/**
 * Enum for syntax types.
 * Values of this object are mostly used for features like code editor content coloring.
 *
 * @readonly
 * @enum {string}
 * @property {number} Keyword - represents a keyword in the syntax.
 * @property {number} Punctuation - represents punctuation in the syntax.
 * @property {number} Comment - represents a comment in the syntax.
 * @property {number} String - represents a string in the syntax.
 * @property {number} Number - represents a number in the syntax.
 * @property {number} Boolean - represents a boolean in the syntax.
 * @property {number} Custom1 - represents a custom syntax type that can be used to provide grammar features.
 * @property {number} Custom2 - represents a custom syntax type that can be used to provide grammar features.
 * @property {number} Custom3 - represents a custom syntax type that can be used to provide grammar features.
 * @property {number} Custom4 - represents a custom syntax type that can be used to provide grammar features.
 */
export const SyntaxType = {
  KEYWORD: 'KEYWORD',
  PUNCTUATION: 'PUNCTUATION',
  COMMENT: 'COMMENT',
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  CUSTOM1: 'CUSTOM1',
  CUSTOM2: 'CUSTOM2',
  CUSTOM3: 'CUSTOM3',
  CUSTOM4: 'CUSTOM4',
};
