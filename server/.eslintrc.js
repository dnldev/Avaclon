module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  husky: {
    hooks: {
      'pre-commit': 'precise-commits',
    },
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'no-console': 1,
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
