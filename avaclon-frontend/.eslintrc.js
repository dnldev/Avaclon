module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  husky: {
    hooks: {
      'pre-commit': 'precise-commits',
    },
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'no-console': 1,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
