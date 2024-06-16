import { CharStreams, CommonTokenStream, PredictionMode } from 'antlr4';
import GQLLexer from '$worker/gql/generated/gql-lexer';
import GQLParser from '$worker/gql/generated/gql-parser';
import { SuggestionsBuilder } from '$worker/shared/suggestions-builder';
import { CaseKind } from '$worker/shared/const/case-kind';

const largeExample =
  'CREATE GRAPH mySocialNetwork OPEN TYPE\n' +
  'INSERT (:Person { "firstname": "Keith", "lastname": "Hare", \n' +
  '         "joined": DATE "2022-08-23" })\n' +
  '       -[:LIVES_IN { "since": DATE "1980-07-15" }]->\n' +
  '       (:City { "name":"Granville", "state":"OH",\n' +
  '         "country": "USA" })\n' +
  'INSERT (:Pet { "name": "Winnifred", "type": "Dog" })\n' +
  'MATCH (a { "firstname": "Keith" }), (d { "name": "Winnifred" })\n' +
  'INSE';

describe('SuggestionsBuilder', () => {
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
      const suggestionsBuilder = new SuggestionsBuilder(lexerFactory, parserFactory, '');
      const suggestions = suggestionsBuilder.suggest();

      expect(suggestions).toEqual([]);
    });

    it('should return suggestions for specific input', () => {
      const suggestionsBuilder = new SuggestionsBuilder(
        lexerFactory,
        parserFactory,
        'CREATE graph test OPEN TYPE\nmat',
      );

      const suggestions = suggestionsBuilder.suggest();

      expect(suggestions).toEqual([]);
    });

    it('should return suggestions for large input', () => {
      const suggestionsBuilder = new SuggestionsBuilder(lexerFactory, parserFactory, largeExample);
      const suggestions = suggestionsBuilder.suggest();

      expect(suggestions).toEqual([]);
    });
  });

  describe('setCasePreference', () => {
    it('should update case preference', () => {
      const suggestionsBuilder = new SuggestionsBuilder(lexerFactory, parserFactory, '');
      suggestionsBuilder.setCasePreference(CaseKind.UPPER);
      expect(suggestionsBuilder.casePreference).toBe(CaseKind.UPPER);
      suggestionsBuilder.setCasePreference(CaseKind.BOTH);
      expect(suggestionsBuilder.casePreference).toBe(CaseKind.BOTH);
    });
  });
});
