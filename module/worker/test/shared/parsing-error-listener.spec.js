import { ParsingErrorListener } from '$worker/shared/parsing-error-listener';
import { grammars } from '$worker/grammars';

describe('ParsingErrorListener', () => {
  test('should handle syntax errors and store them', () => {
    const errorListener = new ParsingErrorListener();

    const recognizer = {};
    const offendingSymbol = {};
    const line = 1;
    const charPositionInLine = 5;
    const msg = 'Syntax error message';
    const e = new Error();

    errorListener.syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e);

    const errors = errorListener.getErrors();
    const parserError = errors[0];

    const expectedError1 = {
      lineIndex: line,
      charPosition: charPositionInLine,
      message: msg,
    };

    expect(errors).toHaveLength(1);
    expect(parserError).toEqual(expectedError1);
  });

  test('should return stored errors using getErrors method', () => {
    const errorListener = new ParsingErrorListener();

    errorListener.syntaxError({}, {}, 1, 2, 'Error 1', new Error());
    errorListener.syntaxError({}, {}, 3, 4, 'Error 2', new Error());

    const errors = errorListener.getErrors();

    const expectedError1 = {
      lineIndex: 1,
      charPosition: 2,
      message: 'Error 1',
    };

    const expectedError2 = {
      lineIndex: 3,
      charPosition: 4,
      message: 'Error 2',
    };

    expect(errors).toHaveLength(2);
    expect(errors[0]).toEqual(expectedError1);
    expect(errors[1]).toEqual(expectedError2);
  });

  it('should return errors in real execution conditions', () => {
    const grammar = grammars.GQL;
    const lexer = grammar.createLexer('mat');
    const parser = grammar.createParser(lexer);
    const errorListener = new ParsingErrorListener();

    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    parser.gqlProgram();

    expect(errorListener.getErrors().length).toBe(1);
  });
});
