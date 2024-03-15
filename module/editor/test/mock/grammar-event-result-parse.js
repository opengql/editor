export const mockGrammarEventResultParse = (parseResult) => ({
  text: 'example code',
  parseTree: [
    {
      name: 'start',
      children: [
        {
          name: 'example1',
          text: 'example',
          type: 1,
        },
        {
          name: 'code1',
          text: 'code',
          type: 2,
        },
      ],
    },
  ],
  isInvalid: false,
  errors: [],
  suggestions: [],
  ...(parseResult ?? {}),
});
