import { ErrorListener } from 'antlr4';

/***
 * Error listener implementation that takes the not tokenized part of the input.
 */
export class TokenizationErrorListener extends ErrorListener {
  constructor(inputStr) {
    super();
    this.inputStr = inputStr;
    this.textNotTokenized = '';
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    this.textNotTokenized = this.inputStr.substring(column);
  }

  reportAmbiguity() {}

  reportAttemptingFullContext() {}

  reportContextSensitivity() {}
}
