module.exports = {
  root: true,
  env: {
    node:true,
    browser: true,
    es6: true,
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/no-dynamic-require': 'off',
    'no-console': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'no-param-reassign': ['error', { props: false }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'vue/script-setup-uses-vars': 0,
    'linebreak-style': [0, 'off', 'windows'],
  }
}
