const prettierConfig = require('./.prettierrc.js');

module.exports = {
  overrides: [
    {
      files: '*.js',
      env: {
        es6: true,
        node: true,
      },
      extends: ['standard', 'prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },
    {
      files: ['module/editor/**/*.jsx', 'module/editor/**/*.js'],
      env: {
        es6: true,
        browser: true,
      },
      globals: {
        editor: true,
        grammar: true,
      },
      extends: ['standard', 'plugin:react/recommended', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './module/editor/tsconfig.json',
      },
      plugins: ['react', 'prettier'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },
    {
      files: ['module/worker/**/*.js'],
      env: {
        es6: true,
        worker: true,
      },
      globals: {
        grammar: true,
      },
      extends: ['standard', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['prettier', 'sort-class-members'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'sort-class-members/sort-class-members': [
          2,
          {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[methods]',
              '[conventional-private-methods]',
            ],
            accessorPairPositioning: 'getThenSet',
          },
        ],
      },
    },
    {
      files: ['**/test/**/*.js', '**/test/**/*.jsx', 'e2e/**/*.js'],
      env: {
        es6: true,
        jest: true,
      },
      globals: {
        grammar: true,
      },
      extends: ['standard', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['prettier', 'sort-class-members'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'sort-class-members/sort-class-members': [
          2,
          {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[methods]',
              '[conventional-private-methods]',
            ],
            accessorPairPositioning: 'getThenSet',
          },
        ],
      },
    },
    {
      files: ['script/**/*.js'],
      env: {
        es6: true,
        node: true,
      },
      extends: ['standard', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './script/tsconfig.json',
      },
      plugins: ['prettier', 'sort-class-members'],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'sort-class-members/sort-class-members': [
          2,
          {
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[methods]',
              '[conventional-private-methods]',
            ],
            accessorPairPositioning: 'getThenSet',
          },
        ],
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
  ],
};
