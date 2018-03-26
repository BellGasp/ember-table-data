module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true,
    jquery: true
  },
  rules: {
    'semi':['error', 'always'],
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used' }],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'consistent'],
    'quotes': ['error', 'single']
  }
};
