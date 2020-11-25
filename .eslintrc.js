module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error", 2
    ],
    "quotes": [
      "error", "double"
    ],
    "semi": [
      "error", "always"
    ],
    "no-case-declarations": [
      0
    ]
  }
};
