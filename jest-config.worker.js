module.exports = {
  roots: ['<rootDir>/module/worker/test'],
  testRegex: '(.*|(\\.|/)(test|spec))\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  testEnvironment: 'jest-environment-node',
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '\\.js$': [
      'babel-jest',
      {
        configFile: './babel-config.worker.js',
      },
    ],
  },
  maxConcurrency: 4,
  testTimeout: 9999999,
};
