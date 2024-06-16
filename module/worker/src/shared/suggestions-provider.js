import { SuggestionsBuilder } from '$worker/shared/suggestions-builder';

export class SuggestionsProvider {
  constructor(lexerFactory, parserFactory, casePreference) {
    this.casePreference = casePreference;
    this.parserFactory = parserFactory;
    this.lexerFactory = lexerFactory;
    this.assertLexerHasAtn();
  }

  suggest(input) {
    const builder = new SuggestionsBuilder(this.lexerFactory, this.parserFactory, input);

    if (this.casePreference !== undefined) {
      builder.setCasePreference(this.casePreference);
    }

    return builder.suggest();
  }

  assertLexerHasAtn() {
    const lexer = this.lexerFactory('');

    if (lexer.atn === undefined) {
      throw new Error('Please use ANTLR4 version 4.7.1 or above.');
    }
  }
}
