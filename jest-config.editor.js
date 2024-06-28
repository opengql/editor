const jsConfig = require('./jsconfig.json');

const transformJsconfigToJestModuleNameMapper = () => {
  const paths = jsConfig.compilerOptions.paths;

  return Object.entries(paths).reduce((acc, [key, value]) => {
    const transformedKey = `^${key.replace('$', '\\$').replace('*', '(.*)')}$`;
    const path = `<rootDir>/${value[0].replace('*', '$1')}`;
    return { ...acc, [transformedKey]: path };
  }, {});
};

module.exports = {
  roots: ['<rootDir>/module/editor/test'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.(js|jsx)$',
  testPathIgnorePatterns: ['module/editor/test/helper', 'module/editor/test/script', 'module/editor/test/mock'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.css$': 'jest-css-modules',
    ...transformJsconfigToJestModuleNameMapper(),
  },
  transform: {
    '\\.jsx?$': [
      'babel-jest',
      {
        configFile: './babel-config.editor.js',
      },
    ],
  },
  collectCoverageFrom: ['module/editor/src/**/*.{js,jsx}'],
  setupFiles: ['<rootDir>/module/editor/test/script/setup.js'],
  setupFilesAfterEnv: ['<rootDir>/module/editor/test/script/setup-after-env.js'],
  globals: {
    editor: {
      VERSION: 'v1',
    },
    grammar: {
      VERSION: 'v2',
    },
  },
};
