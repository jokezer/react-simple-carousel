module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "no-console": 0,
    "react/jsx-no-undef": [2, { "allowGlobals": true }],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-shadow': 0,
    'camelcase': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/media-has-caption': 0,
    'click-events-have-key-events': 0,
    'object-curly-newline': [0, { "multiline": true }]
  },
  "globals": {
    "PropTypes": false,
    "React": false,
    "classnames": false,
    "moment": false,
    "FontAwesome": false,
    "addBemName": false,
    "_": false
  }
}
