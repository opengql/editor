import { GqlExamples } from '../src/generated/gql-examples';
import { createLexer } from '../src/create-lexer';
import { createParser } from '../src/create-parser';
import { ParsingErrorListener } from '../src/parsing-error-listener';

describe('Grammar Test', () => {
  GqlExamples.forEach((example) => {
    it(`should parse example '${example.name}'`, () => {
      const errorListener = new ParsingErrorListener();
      const lexer = createLexer(example.code);
      const parser = createParser(lexer);

      parser.addErrorListener(errorListener);

      parser.gqlProgram();

      console.log(JSON.stringify(errorListener.errors));

      expect(errorListener.errors.length).toEqual(0);
    });
  });
});
