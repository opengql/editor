import { pgSchemeExamples } from '$worker/pg-scheme/generated/pg-scheme-examples.ts';

export const createPgSchemeGrammar = () => {
  const baseDefinition = {
    name: 'PG Scheme',
    defaultQuery: 'CREATE EDGE TYPE (:CustomerType)-[OwnsAccountType: owns]->(:AccountType)',
    examples: pgSchemeExamples,
  };

  return { ...baseDefinition };
};
