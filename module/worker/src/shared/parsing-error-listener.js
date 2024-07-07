import { ErrorListener } from 'antlr4';

/***
 * Object that provides information about the error received from parsing process.
 * This information is based on three properties that indicates the position of error in the input code and short description of the issue.
 *
 * @typedef {ParseError}
 * @property {number} lineIndex value that indicates in which input line the error is placed
 * @property {number} charPosition value that indicates in what position the error is placed in line
 * @property {string} message string message that describes the actual error related to given position
 */

/***
 * Class for handling parsing errors.
 *
 * @extends ErrorListener
 */
export class ParsingErrorListener extends ErrorListener {
  /***
   * Creates an instance of ParsingErrorListener.
   */
  constructor() {
    super();
    this.errors = [];
  }

  /***
   * Handles syntax errors encountered during parsing.
   *
   * @param {import('antlr4').Recognizer} recognizer - The recognizer where the error occurred.
   * @param {import('antlr4').Token} offendingSymbol - The offending token in the input.
   * @param {number} line - The line number where the error occurred.
   * @param {number} charPositionInLine - The character position within the line where the error occurred.
   * @param {string} msg - The error message.
   * @param {import('antlr4').RecognitionException} e - The exception thrown by the recognizer.
   */
  syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
    const parserError = {
      lineIndex: line,
      charPosition: charPositionInLine,
      message: msg,
    };

    this.errors.push(parserError);
  }

  /***
   * Reports ambiguity in the parser.
   * (Intentionally not implemented)
   */
  reportAmbiguity() {}

  /***
   * Reports that the parser is attempting full context.
   * (Intentionally not implemented)
   */
  reportAttemptingFullContext() {}

  /***
   * Reports context sensitivity in the parser.
   * (Intentionally not implemented)
   */
  reportContextSensitivity() {}

  /***
   * Returns the list of errors encountered during parsing.
   *
   * @returns {ParseError[]} The list of errors.
   */
  getErrors() {
    return this.errors;
  }
}
