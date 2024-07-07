import { CharStreams, CommonTokenStream } from 'antlr4';
import { GrammarBuilder } from '$worker/shared/grammar-builder';
import { CommonSyntaxObjects } from '$worker/shared/common-syntax-objects';
import PgsLexer from '$worker/pgs/generated/pgs-lexer';
import PgsParser from '$worker/pgs/generated/pgs-parser';
import { pgsExamples } from '$worker/pgs/generated/pgs-examples';

export const createPgsGrammar = () => {
  const baseDefinition = {
    name: 'PGS',
    label: 'PG Scheme',
    defaultQuery: 'CREATE EDGE TYPE (:CustomerType)-[OwnsAccountType: owns]->(:AccountType)',
    examples: pgsExamples,
  };

  return {
    ...baseDefinition,
    createLexer: (input) => {
      const inputSteam = CharStreams.fromString(input);
      return new PgsLexer(inputSteam);
    },
    createParser: (lexer) => {
      const commonTokenStream = new CommonTokenStream(lexer);
      const parser = new PgsParser(commonTokenStream);
      parser.buildParseTrees = true;
      parser.removeErrorListeners();
      parser._interp.predictionMode = 0;
      return parser;
    },
    parse: (parser) => parser.pgs(),
    createGrammarDefinition: (parser) =>
      new GrammarBuilder()
        .withName(baseDefinition.name)
        .withDataFromAntlr([...parser.getSymbolicNames(), ...parser.getLiteralNames()])
        .withSyntaxObject(CommonSyntaxObjects.STRING)
        .build(),
  };
};
