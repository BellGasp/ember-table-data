module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    jquery: true,
    node: true
  },
  rules: {
    'indent': ['error', 2],
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used' }],
    'max-len': ['error', 100, { 'ignoreComments': true }],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single']
  }
};
