import { grammars, isGrammarNotDefined } from '$worker/grammars';
import { ParsingErrorListener } from '$worker/shared/parsing-error-listener';
import { ParseTreeExtractor } from '$worker/shared/parse-tree-extractor';

onmessage = ({ data }) => {
  const { type } = data;

  switch (type) {
    case 'fetch-grammars': {
      const grammarsList = Object.values(grammars).map(({ name, label, defaultQuery, examples }) => ({
        name,
        label,
        defaultQuery,
        examples,
      }));

      postMessage(grammarsList);
      return;
    }

    case 'initialize': {
      const { selectedGrammar } = data.payload;

      if (isGrammarNotDefined(selectedGrammar)) {
        return;
      }

      const grammar = grammars[selectedGrammar];
      const lexer = grammar.createLexer(grammar.defaultQuery);
      const parser = grammar.createParser(lexer);
      const grammarDefinition = grammar.createGrammarDefinition(parser);
      const { name } = grammar;

      postMessage({ name, grammarDefinition });
      return;
    }

    case 'parse': {
      const { selectedGrammar, text } = data.payload;

      if (isGrammarNotDefined(selectedGrammar)) {
        return;
      }

      const grammar = grammars[selectedGrammar];
      const lexer = grammar.createLexer(text);
      const errorListener = new ParsingErrorListener();
      const parser = grammar.createParser(lexer);

      parser.addErrorListener(errorListener);

      const parseOutput = grammar.parse(parser);
      const parseTreeExtractor = new ParseTreeExtractor(parser);
      const parseTree = parseTreeExtractor.extract(parseOutput);
      const errors = errorListener.getErrors();
      const isInvalid = errors.length !== 0;
      const result = { text, parseTree, errors, isInvalid };

      postMessage(result);
    }
  }
};
