import { GqlExamples } from '$worker/generated/gql-examples';
import { createLexer } from '$worker/create-lexer';
import { createParser } from '$worker/create-parser';
import { ParsingErrorListener } from '$worker/parsing-error-listener';

describe('Grammar Test', () => {
  GqlExamples.forEach((example) => {
    it(`should parse example '${example.name}'`, () => {
      const errorListener = new ParsingErrorListener();
      const lexer = createLexer(example.code);
      const parser = createParser(lexer);

      parser.addErrorListener(errorListener);

      parser.gqlProgram();

      expect(errorListener.errors.length).toEqual(0);
    });
  });
});
