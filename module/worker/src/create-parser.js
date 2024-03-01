import { CommonTokenStream } from 'antlr4';
import GQLParser from './generated/gql-parser';

export function createParser(lexer) {
  const commonTokenStream = new CommonTokenStream(lexer);
  const parser = new GQLParser(commonTokenStream);
  parser.buildParseTrees = true;
  parser.removeErrorListeners();
  parser._interp.predictionMode = 0;
  return parser;
}
