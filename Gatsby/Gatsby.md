# Gatsby.js

- packages

```bash
npm install -g gatsby-cli

# initiate a project with a starter
gatsby new <PROJECT_NAME> <STARTER_REPOSITORY>

# absolute imports
npm i --save-dev gatsby-plugin-root-import
```

- config

```js
// gatsby-config.js
const path = require('path');

module.exports = {
  plugins: [
    // absolute import
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        root: path.join(__dirname, 'src')
      }
    }
  ]
};
```

- gatsby-cli commands

1. gatsby develop
2. gatsby build
3. gatsby serve
4. gatsby clean

### Styled Components
