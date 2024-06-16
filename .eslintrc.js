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
      },
      plugins: ['react', 'prettier', 'import'],
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          webpack: {
            config: './webpack.editor.config.js',
          },
        },
      },
      rules: {
        'prettier/prettier': ['error', prettierConfig],
      },
    },
    {
      files: ['module/editor/test/**/*.jsx', 'module/editor/test/**/*.js'],
      env: {
        es6: true,
        'jest/globals': true,
      },
      globals: {
        grammar: true,
      },
      extends: ['standard', 'plugin:react/recommended', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['prettier', 'sort-class-members', 'import', 'jest-dom', 'jest'],
      settings: {
        'import/resolver': {
          webpack: {
            config: './webpack.editor.config.js',
          },
        },
      },
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
      files: ['module/worker/**/*.js'],
      excludedFiles: [
        '**/*-lexer.js',
        '**/*-listener.js',
        '**/*-parser.js',
      ],
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
      plugins: ['prettier', 'sort-class-members', 'import'],
      settings: {
        'import/resolver': {
          webpack: {
            config: './webpack.worker.config.js',
          },
        },
      },
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
      files: ['module/worker/test/**/*.js'],
      env: {
        es6: true,
        worker: true,
        'jest/globals': true,
      },
      globals: {
        grammar: true,
      },
      extends: ['standard', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['prettier', 'sort-class-members', 'import', 'jest'],
      settings: {
        'import/resolver': {
          webpack: {
            config: './webpack.worker.config.js',
          },
        },
      },
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
      files: ['e2e/**/*.js'],
      env: {
        es6: true,
        worker: true,
        'jest/globals': true,
      },
      globals: {
        grammar: true,
      },
      extends: ['standard', 'prettier'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['prettier', 'sort-class-members', 'jest'],
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
  ],
};
