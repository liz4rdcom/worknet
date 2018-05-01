// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-console': 0,
    'no-unused-expressions': 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'prefer-destructuring': 0,
    'object-shorthand': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'no-return-await': 0,
    'no-plusplus': 0,
    "comma-dangle": [2, 'always-multiline'],
    'no-unused-vars': 1,
  }
}
