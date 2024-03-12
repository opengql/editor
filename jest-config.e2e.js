module.exports = {
  roots: ['<rootDir>/e2e'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/e2e/helpers'],
  testEnvironment: 'jest-environment-node',
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '\\js$': [
      'babel-jest',
      {
        configFile: './babel-config.worker.js',
      },
    ],
  },
  maxConcurrency: 4,
  testTimeout: 9999999,
};
