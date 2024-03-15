export const mockGrammarEventResultInit = (initResult) => ({
  grammarDefinition: {
    name: 'mockGrammar',
    keywords: ['test'],
    syntax: [
      {
        syntaxType: 'KEYWORD',
        pattern: {
          pattern: /test/g,
        },
      },
    ],
  },
  examples: [
    {
      name: 'mocked example',
      code: 'test code example\n',
    },
  ],
  ...(initResult ?? {}),
});
