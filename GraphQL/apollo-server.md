# apollo-server

- schema types (interface for API call) with `gql`

```js
// create an JS object with GraphQL logic functions
const typeDefs = gql`
  # entry point schema
  schema {
    query: Query # operation: type
  }

  type Query {
    greeting: String
  }
`;
```

- resolvers

```js
// verifying the structure of type definitions
const resolvers = {
  Query: {
    greeting: () => {
      // do sometihng
    }
  }
};
```

## apollo-server with express.js

```bash
npm i apollo-server-express graphql
```

- setup

```js
// index.js
const { ApolloServer, gql } = require('apollo-server-express');

const app = expresss();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({
  app,
  path: '/graphql' /* graphql server endpoint */
});
```

- typeDefs

```js
// schema.graphql
type Query {
  greeting: String
}

// type
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
```

- resolvers

```js
// resolvers.js
const Query = {
  greeting: () => 'Hello World!'
};
```
