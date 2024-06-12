import { TokenizationErrorListener } from '$worker/tokenization-error-listener';

export class LexerWrapper {
  constructor(lexerFactory) {
    this.lexerFactory = lexerFactory;
    this.cachedLexer = undefined;
  }

  tokenizeNonDefaultChannel(input) {
    const errorListener = new TokenizationErrorListener(input);
    const lexer = this.createLexer(input);

    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);

    return {
      textNotTokenized: errorListener.textNotTokenized,
      tokens: lexer.getAllTokens().filter((token) => token.channel === 0),
    };
  }

  findStateByRuleNumber(ruleNumber) {
    const atn = this.getCachedLexer().atn;
    return atn.ruleToStartState?.slice(ruleNumber, ruleNumber + 1)[0];
  }

  createLexer(input) {
    return this.lexerFactory(input);
  }

  getCachedLexer() {
    if (this.cachedLexer === undefined) {
      this.cachedLexer = this.createLexer('');
    }

    return this.cachedLexer;
  }
}
