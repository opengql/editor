module.exports = {
  verbose: true,
  roots: ['<rootDir>/module/editor/test'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.(js|jsx)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    'module/editor/test/helper',
    'module/editor/test/script',
    'module/editor/test/mock',
  ],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.css$': 'jest-css-modules',
  },
  transform: {
    '\\.jsx?$': [
      'babel-jest',
      {
        configFile: './babel-config.editor.js',
      },
    ],
  },
  setupFiles: ['<rootDir>/module/editor/test/script/setup.js'],
  globals: {
    editor: {
      VERSION: 'v1',
    },
    grammar: {
      VERSION: 'v2',
    },
  },
};
