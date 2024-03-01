import { CharStreams } from 'antlr4';
import GQLLexer from './generated/gql-lexer';

export function createLexer(input) {
  const inputSteam = CharStreams.fromString(input);
  return new GQLLexer(inputSteam);
}
