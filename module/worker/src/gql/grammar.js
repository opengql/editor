import { CharStreams, CommonTokenStream } from 'antlr4';
import { gqlExamples } from '$worker/gql/generated/gql-examples';
import GQLLexer from '$worker/gql/generated/gql-lexer';
import GQLParser from '$worker/gql/generated/gql-parser';
import { GrammarBuilder } from '$worker/shared/grammar-builder';
import { CommonSyntaxObjects } from '$worker/shared/common-syntax-objects';

export const createGqlGrammar = () => {
  const baseDefinition = {
    name: 'GQL',
    label: 'GQL',
    defaultQuery: 'MATCH (p:Person)-[:LIVES_IN]->(c:City)',
    examples: gqlExamples,
  };

  return {
    ...baseDefinition,
    createLexer: (input) => {
      const inputSteam = CharStreams.fromString(input);
      return new GQLLexer(inputSteam);
    },
    createParser: (lexer) => {
      const commonTokenStream = new CommonTokenStream(lexer);
      const parser = new GQLParser(commonTokenStream);
      parser.buildParseTrees = true;
      parser.removeErrorListeners();
      parser._interp.predictionMode = 0;
      return parser;
    },
    parse: (parser) => parser.gqlProgram(),
    createGrammarDefinition: (parser) =>
      new GrammarBuilder()
        .withName(baseDefinition.name)
        .withDataFromAntlr(parser.getLiteralNames())
        .withSyntaxObject(CommonSyntaxObjects.C_LIKE_COMMENT)
        .withSyntaxObject(CommonSyntaxObjects.STRING)
        .build(),
  };
};
