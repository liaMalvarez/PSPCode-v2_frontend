module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.js', '.jsx',
        ],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'new-cap': 0,
    'react/button-has-type': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'no-unused-vars': 0,
    'react/require-default-props': 0,
    'no-plusplus': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 1,
    'no-param-reassign': 1,
    camelcase: 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx',
        ],
      },
      typescript: {},
    },
  },
};
