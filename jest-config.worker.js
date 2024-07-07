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
  roots: ['<rootDir>/module/worker/test'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  testEnvironment: 'jest-environment-node',
  moduleFileExtensions: ['js'],
  moduleNameMapper: transformJsconfigToJestModuleNameMapper(),
  transform: {
    '\\.js$': [
      'babel-jest',
      {
        configFile: './babel-config.worker.js',
      },
    ],
  },
};
