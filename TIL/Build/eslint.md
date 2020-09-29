# ESLint

```json
{
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "browser": true
  },
  "rules": {
    "no-console": 0,
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "indent": ["error", 2],
    "no-multi-spaces": ["error"],
    "no-multiple-empty-lines": ["error", { "max": 2, "maxEOF": 0 }]
  }
}
```

- `npm install babel-eslint --save-dev` (parser)

```json
"parser": "babel-eslint"
```

- override rules

```json
"rules": {
  "no-console": 0 // allows console
}
```
