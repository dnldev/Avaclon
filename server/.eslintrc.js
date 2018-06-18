module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      arrowFunctions: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
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
