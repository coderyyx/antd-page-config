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
    'max-len': [1, { code: 140 }],
    'jsx-quotes': [1, 'prefer-single'],
    'object-curly-newline': [0],
    'import/no-unresolved': [0],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/state-in-constructor': [0],
    'react/destructuring-assignment': [0],
    'react/no-access-state-in-setstate': [0],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': [0],
    'react/jsx-no-bind': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'jsx-a11y/no-noninteractive-tabindex': [0],
    'import/prefer-default-export': [0]
  }
}