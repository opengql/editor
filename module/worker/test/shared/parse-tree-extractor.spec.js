import { ParseTreeExtractor } from '$worker/shared/parse-tree-extractor';
import GQLParser from '$worker/gql/generated/gql-parser';
import { grammars } from '$worker/grammars';

describe('ParseTreeExtractor', () => {
  const grammar = grammars.GQL;

  describe('extract', () => {
    it('should extract the parse tree correctly', () => {
      const lexer = grammar.createLexer('session start');
      const parser = grammar.createParser(lexer);
      const parseResult = parser.gqlProgram();
      const parseTreeExtractor = new ParseTreeExtractor(parser);
      const result = parseTreeExtractor.extract(parseResult);

      expect(result).toEqual([
        {
          ruleChildren: [
            {
              symbolText: 'session',
              symbolType: GQLParser.SESSION,
              type: 'TERMINAL',
            },
            {
              symbolText: 'start',
              symbolType: GQLParser.START,
              type: 'TERMINAL',
            },
          ],
          ruleName: 'gqlProgram',
          type: 'NORMAL',
        },
      ]);
    });
  });
});
