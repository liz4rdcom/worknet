module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },

  extends: 'standard',
  plugins: [
    'node',
    'standard'
  ],

  // add your custom rules here
  'rules': {
    'node/exports-style': ['error', 'module.exports'],
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
    'space-before-function-paren': 0,
    'semi': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multiple-empty-lines': 1,
    'eol-last': 1,
    'padded-blocks': 1,
    'prefer-arrow-callback': 1,
    "comma-dangle": [2, 'always-multiline']
  }
}
