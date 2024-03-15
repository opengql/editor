import { ATNState, CharStreams, IntervalSet } from 'antlr4';
import GQLLexer from '../src/generated/gql-lexer';
import { LexerWrapper } from '../src/lexer-wrapper';
import { TokenSuggester } from '../src/token-suggester';

describe('TokenSuggester', () => {
  const lexerFactory = (input) => {
    const charStream = CharStreams.fromString(input);
    return new GQLLexer(charStream);
  };

  describe('suggest', () => {
    it('should return an empty array if no suggestions are made', () => {
      const lexerWrapper = new LexerWrapper(lexerFactory);
      const tokenSuggester = new TokenSuggester('', lexerWrapper, null);
      const suggestions = tokenSuggester.suggest([]);
      expect(suggestions).toEqual([]);
    });

    it('should handle epsilon transition', () => {
      const lexerWrapper = new LexerWrapper(lexerFactory);
      const tokenSuggester = new TokenSuggester('', lexerWrapper, null);

      const state = {
        atn: null,
        stateNumber: -1,
        stateType: null,
        ruleIndex: 0,
        epsilonOnlyTransitions: false,
        transitions: [],
        nextTokenWithinRule: null,
      };

      const transition = {
        target: state,
        isEpsilon: true,
        label: null,
      };

      state.transitions = [transition];
      const suggestions = tokenSuggester.suggest([20]);
      expect(suggestions).toEqual(['~>']);
    });

    it('should handle atom transition', () => {
      const lexerWrapper = new LexerWrapper(lexerFactory);
      const tokenSuggester = new TokenSuggester('', lexerWrapper, null);

      const state = {
        atn: null,
        stateNumber: -1,
        stateType: null,
        ruleIndex: 0,
        epsilonOnlyTransitions: false,
        transitions: [],
        nextTokenWithinRule: null,
      };

      const transition = {
        target: state,
        isEpsilon: true,
        label_: 97,
        label: (() => {
          const set = new IntervalSet();
          set.addOne(97);
          return set;
        })(),
        serializationType: 5,
      };

      state.transitions = [transition];
      const suggestions = tokenSuggester.suggest([1]);
      expect(suggestions).toEqual(['<-']);
    });
  });
});
