export class TokenSuggester {
  constructor(origPartialToken, lexerWrapper, casePreference) {
    this.origPartialToken = origPartialToken;
    this.lexerWrapper = lexerWrapper;
    this.suggestions = [];
    this.statesCache = [];
    this.casePreference = casePreference;
  }

  suggest(nextParserTransitionLabels) {
    nextParserTransitionLabels.forEach((label) => {
      const nextTokenRuleNumber = label - 1;
      const lexerState = this.lexerWrapper.findStateByRuleNumber(nextTokenRuleNumber);

      if (lexerState === undefined) {
        return;
      }

      this.findSuggestionForState('', lexerState, this.origPartialToken);
    });

    return this.suggestions;
  }

  findSuggestionForState(tokenSoFar, state, remainingText) {
    if (this.statesCache.includes(state.stateNumber)) {
      return;
    }

    this.statesCache.push(state.stateNumber);
    const tokenNotEmpty = tokenSoFar.length > 0;
    const transitions = state.transitions;

    if (tokenNotEmpty && transitions.length === 0) {
      this.addSuggestedToken(tokenSoFar);
    }

    transitions.forEach((transition) => {
      this.suggestViaLexerTransition(tokenSoFar, remainingText, transition);
    });
  }

  addSuggestedToken(tokenToAdd) {
    const justTheCompletionPart = this.chopOffCommonStart(tokenToAdd, this.origPartialToken);

    if (this.suggestions.includes(justTheCompletionPart)) {
      return;
    }

    this.suggestions.push(justTheCompletionPart);
  }

  chopOffCommonStart(tokenToAdd, origPartialToken) {
    const charsToChopOff = Math.min(tokenToAdd.length, origPartialToken.length);
    return tokenToAdd.substring(charsToChopOff, tokenToAdd.length - charsToChopOff);
  }

  suggestViaLexerTransition(tokenSoFar, remainingText, transition) {
    if (transition.isEpsilon) {
      this.findSuggestionForState(tokenSoFar, transition.target, remainingText);
    } else if (transition.serializationType === 5) {
      const newTokenChar = this.getAddedTextFor(transition);

      if (remainingText === '' || remainingText.startsWith(newTokenChar)) {
        this.suggestViaNonEpsilonLexerTransition(tokenSoFar, remainingText, newTokenChar, transition.target);
      }
    } else if (transition.serializationType === 7) {
      const allLabelChars = this.calcAllLabelChars(transition.label);

      transition.label.intervals.forEach((interval) => {
        for (let codePoint = interval.a; codePoint < interval.b; ++codePoint) {
          const character = String.fromCodePoint(codePoint);
          const shouldIgnoreCase = this.shouldIgnoreThisCase(character, allLabelChars);
          const newTokenChar = String.fromCodePoint(codePoint);

          if (!shouldIgnoreCase && (remainingText === '' || remainingText.startsWith(newTokenChar))) {
            this.suggestViaNonEpsilonLexerTransition(tokenSoFar, remainingText, newTokenChar, transition.target);
          }
        }
      });
    }
  }

  getAddedTextFor(transition) {
    return String.fromCodePoint(transition.label);
  }

  suggestViaNonEpsilonLexerTransition(tokenSoFar, remainingText, newTokenChar, target) {
    const newRemainingText = remainingText.length > 0 ? remainingText.substring(1) : '';
    this.findSuggestionForState(tokenSoFar + newTokenChar, target, newRemainingText);
  }

  calcAllLabelChars(label) {
    const allLabelChars = [];

    label.intervals.forEach((interval) => {
      for (let codePoint = interval.a; codePoint < interval.b; ++codePoint) {
        allLabelChars.push(String.fromCharCode(codePoint));
      }
    });

    return allLabelChars;
  }

  shouldIgnoreThisCase(character, allLabelChars) {
    if (this.casePreference === null || this.casePreference === 'BOTH') {
      return false;
    }

    const upper = character.toUpperCase();
    const lower = character.toLowerCase();

    switch (this.casePreference) {
      case 'LOWER':
        return character === upper && allLabelChars.includes(lower);
      case 'UPPER':
        return character === lower && allLabelChars.includes(upper);
      default:
        return false;
    }
  }
}
