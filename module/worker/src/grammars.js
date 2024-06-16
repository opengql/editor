import { createGqlGrammar } from '$worker/gql/grammar';
import { createPgsGrammar } from '$worker/pgs/grammar';

export const grammars = {
  GQL: createGqlGrammar(),
  PGS: createPgsGrammar(),
};

export const isGrammarNotDefined = (grammarName) => grammars[grammarName] === undefined;
