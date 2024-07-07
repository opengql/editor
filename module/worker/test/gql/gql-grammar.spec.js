import { gqlExamples } from '$worker/gql/generated/gql-examples';
import { ParsingErrorListener } from '$worker/shared/parsing-error-listener';
import { grammars } from '$worker/grammars';

describe('GQL Grammar Test', () => {
  gqlExamples.forEach((example) => {
    it(`should parse example '${example.name}'`, () => {
      const grammar = grammars.GQL;
      const errorListener = new ParsingErrorListener();
      const lexer = grammar.createLexer(example.code);
      const parser = grammar.createParser(lexer);

      parser.addErrorListener(errorListener);
      parser.gqlProgram();

      expect(errorListener.errors.length).toEqual(0);
    });
  });
});
