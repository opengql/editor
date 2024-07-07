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
  roots: ['<rootDir>/e2e'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/e2e/helpers', '/e2e/setup'],
  testEnvironment: 'jest-environment-node',
  moduleFileExtensions: ['js', 'json', 'node'],
  moduleNameMapper: transformJsconfigToJestModuleNameMapper(),
  transform: {
    '\\.js$': [
      'babel-jest',
      {
        configFile: './babel-config.worker.js',
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/e2e/setup/after-env.js'],
};
