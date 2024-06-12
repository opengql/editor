import { createParser } from '$worker/create-parser';
import { SuggestionsProvider } from '$worker/suggestions-provider';
import { ParseTreeExtractor } from '$worker/parse-tree-extractor';
import { ParsingErrorListener } from '$worker/parsing-error-listener';
import { CaseKind } from '$worker/const/case-kind';
import { createLexer } from '$worker/create-lexer';
import { GrammarBuilder } from '$worker/grammar-builder';
import { CommonSyntaxObjects } from '$worker/common-syntax-objects';
import { GqlExamples } from '$worker/generated/gql-examples';

onmessage = ({ data }) => {
  const { type } = data;

  switch (type) {
    case 'parse': {
      const { payload } = data;
      const text = payload.text;
      const lexer = createLexer(text);
      const errorListener = new ParsingErrorListener();
      const parser = createParser(lexer);

      parser.addErrorListener(errorListener);

      const codeSuggestion = new SuggestionsProvider(createLexer, createParser, CaseKind.BOTH);
      const suggestions = codeSuggestion.suggest(text);
      const parseOutput = parser.gqlProgram();
      const parseTreeExtractor = new ParseTreeExtractor(parser);
      const parseTree = parseTreeExtractor.extract(parseOutput);
      const errors = errorListener.getErrors();
      const isInvalid = errors.length !== 0;
      const result = { text, suggestions, parseTree, errors, isInvalid };

      postMessage(result);
      return;
    }

    case 'initialize': {
      const lexer = createLexer('MATCH (p:Person)-[:LIVES_IN]->(c:City)');
      const parser = createParser(lexer);

      const grammarDefinition = new GrammarBuilder()
        .withName('GQL')
        .withDataFromAntlr(parser.getLiteralNames())
        .withSyntaxObject(CommonSyntaxObjects.C_LIKE_COMMENT)
        .withSyntaxObject(CommonSyntaxObjects.STRING)
        .build();

      postMessage({ grammarDefinition, examples: GqlExamples });
    }
  }
};
