module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'import/no-unresolved': [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'react/destructuring-assignment': [0],
    'react/no-access-state-in-setstate': [0],
  }
}