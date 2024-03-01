import { ErrorListener } from 'antlr4';

export class ParsingErrorListener extends ErrorListener {
  constructor() {
    super();
    this.errors = [];
  }

  syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
    const parserError = {
      lineIndex: line,
      charPosition: charPositionInLine,
      message: msg,
    };

    this.errors.push(parserError);
  }

  reportAmbiguity() {}

  reportAttemptingFullContext() {}

  reportContextSensitivity() {}

  getErrors() {
    return this.errors;
  }
}
