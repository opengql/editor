import { pgsExamples } from '$worker/pgs/generated/pgs-examples';
import { grammars } from '$worker/grammars';
import { ParsingErrorListener } from '$worker/shared/parsing-error-listener';

describe('PG Scheme Grammar Test', () => {
  pgsExamples.forEach((example) => {
    it(`should parse example '${example.name}'`, () => {
      const grammar = grammars.PGS;
      const errorListener = new ParsingErrorListener();
      const lexer = grammar.createLexer(example.code);
      const parser = grammar.createParser(lexer);

      parser.addErrorListener(errorListener);
      parser.pgs();

      expect(errorListener.errors.length).toEqual(0);
    });
  });
});
