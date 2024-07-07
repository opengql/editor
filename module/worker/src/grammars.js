import { createGqlGrammar } from '$worker/gql/grammar';
import { createPgsGrammar } from '$worker/pgs/grammar';

export const grammars = {
  GQL: createGqlGrammar(),
  PGS: createPgsGrammar(),
};

/***
 * Method that allows to check is given language defined in worker.
 *
 * @param {string} grammarName
 * @returns {boolean}
 */
export const isGrammarNotDefined = (grammarName) => grammars[grammarName] === undefined;
