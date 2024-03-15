import { CharStreams, CommonTokenStream, PredictionMode } from 'antlr4';
import GQLLexer from '../src/generated/gql-lexer';
import GQLParser from '../src/generated/gql-parser';
import { ParseTreeExtractor } from '../src/parse-tree-extractor';

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
          type: 'NORMAL',
          ruleName: 'gqlProgram',
          ruleChildren: [
            {
              type: 'NORMAL',
              ruleName: 'activity',
              ruleChildren: [
                {
                  type: 'NORMAL',
                  ruleName: 'programActivity',
                  ruleChildren: [
                    {
                      type: 'NORMAL',
                      ruleName: 'sessionActivity',
                      ruleChildren: [],
                    },
                  ],
                },
              ],
            },
            {
              type: 'NORMAL',
              ruleName: 'activity',
              ruleChildren: [
                {
                  type: 'NORMAL',
                  ruleName: 'programActivity',
                  ruleChildren: [
                    {
                      type: 'NORMAL',
                      ruleName: 'sessionActivity',
                      ruleChildren: [
                        {
                          type: 'TERMINAL',
                          symbolType: 226,
                          symbolText: 'session',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'NORMAL',
              ruleName: 'activity',
              ruleChildren: [
                {
                  type: 'NORMAL',
                  ruleName: 'programActivity',
                  ruleChildren: [
                    {
                      type: 'NORMAL',
                      ruleName: 'transactionActivity',
                      ruleChildren: [
                        {
                          type: 'NORMAL',
                          ruleName: 'transactionStartCommand',
                          ruleChildren: [
                            {
                              type: 'TERMINAL',
                              symbolType: 235,
                              symbolText: 'start',
                            },
                            {
                              type: 'TERMINAL',
                              symbolType: 352,
                              symbolText: "<missing 'transaction'>",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'TERMINAL',
              symbolType: -1,
              symbolText: '<EOF>',
            },
          ],
        },
      ]);
    });
  });
});
