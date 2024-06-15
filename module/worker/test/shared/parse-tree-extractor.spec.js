import { CharStreams, CommonTokenStream, PredictionMode } from 'antlr4';
import GQLLexer from '../src/generated/gql-lexer';
import GQLParser from '../src/generated/gql-parser';
import { ParseTreeExtractor } from '$worker/parse-tree-extractor';

describe('ParseTreeExtractor', () => {
  const lexerFactory = (input) => {
    const charStream = CharStreams.fromString(input);
    return new GQLLexer(charStream);
  };

  const parserFactory = (lexer) => {
    const commonTokenStream = new CommonTokenStream(lexer);
    const parser = new GQLParser(commonTokenStream);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();
    parser._interp.predictionMode = PredictionMode.SLL;
    return parser;
  };

  describe('extract', () => {
    it('should extract the parse tree correctly', () => {
      const lexer = lexerFactory('session start');
      const parser = parserFactory(lexer);
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
