import { CharStreams, CommonTokenStream, PredictionMode } from 'antlr4';
import GQLLexer from '../src/generated/gql-lexer';
import GQLParser from '../src/generated/gql-parser';
import { SuggestionsProvider } from '../src/suggestions-provider';
import { CaseKind } from '../src/const/case-kind';

describe('SuggestionsProvider', () => {
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

  describe('suggest', () => {
    it('should return no suggestions for specific input', () => {
      const provider = new SuggestionsProvider(lexerFactory, parserFactory);
      const suggestions = provider.suggest('');

      expect(suggestions).toEqual([]);
    });

    it('should return suggestions for specific input', () => {
      const provider = new SuggestionsProvider(lexerFactory, parserFactory);
      const suggestions = provider.suggest('CREATE TABLE');

      expect(suggestions).toEqual(['{']);
    });

    it('should return suggestions for specific input with lower case only', () => {
      const provider = new SuggestionsProvider(lexerFactory, parserFactory, CaseKind.LOWER);
      const suggestions = provider.suggest('create table');

      expect(suggestions).toEqual(['{']);
    });

    it('should return suggestions for specific input with lower case only', () => {
      const provider = new SuggestionsProvider(lexerFactory, parserFactory, CaseKind.BOTH);
      const suggestions = provider.suggest('cReAte taBle');

      expect(suggestions).toEqual(['{']);
    });
  });
});
