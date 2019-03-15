module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'implicit-arrow-linebreak': ['error', 'beside'],
    'react/jsx-one-expression-per-line': 'off',
    'arrow-parens': ['error', 'always'],
    'object-curly-newline': ['error', { multiline: true }],
  },
};
