import { LexerWrapper } from '$worker/lexer-wrapper';
import { CaseKind } from '$worker/const/case-kind';
import { TokenSuggester } from '$worker/token-suggester';

const getTransitionKey = (state, transition) =>
  `${state.stateNumber} -> (${transition.serializationType}) -> ${transition.target.stateNumber}`;

const transitionToString = (transition) => `${transition.constructor.name} -> ${transition.target.toString()}`;

export class SuggestionsBuilder {
  constructor(lexerFactory, parserFactory, input) {
    this.lexerWrapper = new LexerWrapper(lexerFactory);
    this.lexerFactory = lexerFactory;
    this.parserFactory = parserFactory;
    this.input = input;
    this.inputTokens = [];
    this.notTokenizedText = '';
    this.parserAtn = undefined;
    this.parserRuleNames = [];
    this.indent = '';
    this.collectedSuggestions = [];
    this.casePreference = CaseKind.BOTH;
    this.parserStatesCache = new Map();
  }

  suggest() {
    this.tokenize();
    this.storeParserAtnAndRuleNames();
    this.runParserAtnAndCollectSuggestions();
    return this.collectedSuggestions;
  }

  setCasePreference(casePreference) {
    this.casePreference = casePreference;
  }

  tokenize() {
    const { textNotTokenized, tokens } = this.lexerWrapper.tokenizeNonDefaultChannel(this.input);
    this.notTokenizedText = textNotTokenized;
    this.inputTokens = tokens;
  }

  storeParserAtnAndRuleNames() {
    const lexer = this.lexerWrapper.getCachedLexer();
    const parser = this.parserFactory(lexer);
    this.parserAtn = parser._interp.atn;
    this.parserRuleNames = parser.ruleNames;
  }

  runParserAtnAndCollectSuggestions() {
    const initialState = this.parserAtn?.states[0];

    if (initialState === undefined) {
      return;
    }

    this.parseAndCollectTokenSuggestions(initialState, 0);
  }

  parseAndCollectTokenSuggestions(state, tokenListIndex) {
    const prevIndent = this.indent;
    this.indent += ' ';

    if (this.isParseStateVisitedAt(state, tokenListIndex)) {
      return;
    }

    const previousTokenListIndex = this.updateParserStateCache(state, tokenListIndex);

    if (this.haveMoreTokens(tokenListIndex)) {
      this.suggestNextTokensForParserState(state);
    }

    state.transitions.forEach((transition) => {
      if (transition.isEpsilon) {
        this.handleEpsilonTransition(transition, tokenListIndex);
      } else if (transition.serializationType === 5) {
        this.handleAtomicTransition(transition, tokenListIndex);
      } else if (transition.serializationType === 7) {
        this.handleSetTransition(transition, tokenListIndex);
      }
    });

    this.indent = prevIndent;
    this.updateParserStateCache(state, previousTokenListIndex);
  }

  isParseStateVisitedAt(parserState, currentTokenListIndex) {
    const lastVisitedThisStateAtTokenListIndex = this.parserStatesCache.get(parserState);
    return currentTokenListIndex === lastVisitedThisStateAtTokenListIndex;
  }

  updateParserStateCache(parserState, tokenListIndex) {
    const previous = this.parserStatesCache.get(parserState);

    if (tokenListIndex === undefined) {
      this.parserStatesCache.delete(parserState);
    } else {
      this.parserStatesCache.set(parserState, tokenListIndex);
    }

    return previous ?? -1;
  }

  haveMoreTokens(index) {
    return index < this.inputTokens.length;
  }

  suggestNextTokensForParserState(state) {
    const transitionLabels = new Set();
    this.getTransitionLabels(state, transitionLabels, new Set());
    const tokenSuggester = new TokenSuggester(this.notTokenizedText, this.lexerWrapper, this.casePreference);

    const suggestions = tokenSuggester
      .suggest([...transitionLabels])
      .filter((suggestion) => !suggestion.includes('\t') && !suggestion.includes('00'));

    this.parseSuggestionsAndAddValidOnes(state, suggestions);
  }

  getTransitionLabels(state, output, visited) {
    state.transitions.forEach((transition) => {
      const transitionKey = getTransitionKey(state, transition);

      if (visited.has(transitionKey)) {
        return;
      }

      if (transition.isEpsilon) {
        visited.add(transitionKey);
        this.getTransitionLabels(transition.target, output, visited);
        visited.delete(transitionKey);
      } else if (transition.serializationType === 5 && 'label_' in transition) {
        output.add(transition.label_);
      } else if (transition.serializationType === 7) {
        transition.label.intervals.forEach((interval) => {
          for (let intervalIndex = interval.a; intervalIndex < interval.b; intervalIndex += 1) {
            output.add(intervalIndex);
          }
        });
      }
    });
  }

  parseSuggestionsAndAddValidOnes(state, suggestions) {
    suggestions.forEach((suggestion) => {
      const addedToken = this.getAddedToken(suggestion);

      if (
        this.isParseableWithAddedToken(state, addedToken, new Set()) &&
        !this.collectedSuggestions.includes(suggestion)
      ) {
        this.collectedSuggestions.push(suggestion);
      }
    });
  }

  getAddedToken(suggestion) {
    const completedText = this.input + suggestion;
    const completedTextTokens = this.lexerWrapper.tokenizeNonDefaultChannel(completedText).tokens;

    if (completedTextTokens.length <= this.inputTokens.length) {
      return null;
    }

    return completedTextTokens[completedTextTokens.length - 1];
  }

  handleEpsilonTransition(transition, index) {
    this.parseAndCollectTokenSuggestions(transition.target, index + 1);
  }

  isParseableWithAddedToken(state, token, visitedTransitions) {
    if (token === null) {
      return false;
    }

    let parseable = false;

    state.transitions.forEach((transition) => {
      if (transition.isEpsilon) {
        const transitionKey = getTransitionKey(state, transition);

        if (visitedTransitions.has(transitionKey)) {
          return;
        }

        visitedTransitions.add(transitionKey);

        if (this.isParseableWithAddedToken(transition.target, token, visitedTransitions)) {
          parseable = true;
        }

        visitedTransitions.delete(transitionKey);
      } else if (transition.serializationType === 5 && 'label_' in transition) {
        const transitionTokenType = transition.label_;

        if (transitionTokenType === token.type) {
          parseable = true;
        }
      } else if (transition.serializationType === 7) {
        transition.label.intervals.forEach((interval) => {
          for (let tokenType = interval.a; tokenType <= interval.b; tokenType += 1) {
            if (tokenType === token.getType()) {
              parseable = true;
            }
          }
        });
      } else {
        throw new Error(`Unexpected: ${transitionToString(transition)}`);
      }
    });

    return parseable;
  }

  handleAtomicTransition(transition, index) {
    const nextToken = this.inputTokens.slice(index, index + 1)[0];
    const nextTokenType = nextToken?.type;

    if (nextTokenType === undefined) {
      return;
    }

    const nextTokenMatchesTransition = transition.label.contains(nextTokenType);

    if (!nextTokenMatchesTransition) {
      return;
    }

    this.parseAndCollectTokenSuggestions(transition.target, index + 1);
  }

  handleSetTransition(transition, index) {
    const nextToken = this.inputTokens.slice(index, index + 1)[0];
    const nextTokenType = nextToken?.type;

    if (nextTokenType === undefined) {
      return;
    }

    transition.label.intervals.forEach((interval) => {
      for (let tokenType = interval.a; tokenType <= interval.b; tokenType += 1) {
        const nextTokenMatchesTransition = tokenType === nextTokenType;

        if (nextTokenMatchesTransition) {
          this.parseAndCollectTokenSuggestions(transition.target, index + 1);
        }
      }
    });
  }
}
