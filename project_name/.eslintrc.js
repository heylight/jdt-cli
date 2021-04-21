module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['vue'],
  rules: {
    'import/no-unresolved': [2, { ignore: ['^@/'] }],
    'import/no-dynamic-require': 'off',
    'no-console': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-param-reassign': ['error', { props: false }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
  },
};
