# Apollo Client

- `npm i apollo-boost` - helper tools

* setup

```js
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
  link: new HttpLink({ uri: endpointURL }), // Apollo client link
  cache: new InMemoryCache(), // caching methods
});
```

### gql

> parse strings into an object that represent GraphQL queries

```js
import gql from 'graphql-tag';

async function graphqlRequest {
  const query = gql`query {}`;
  const mutation = gql`mutation {}`;
  const variables = { properties }

  // ApolloClient query request
  const {
    data: { yo }
  } = await client.query({ query, variables });

  const {
    data: { man }
  } = await client.mutate({ query, variables });
}
```

### ApolloLink

> define how each GraphQL request is handled by the client

- custom `ApolloLink` for authenticating all requests

```js
// request preprocessor
const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    // properties to be used in the request
    operation.setContext({
      // used in `HttpLink`
      headers: {
        authorization: 'Bearer' + getAccessToken(),
      },
    });
  }

  return forward(operation); // the next function
});

const client = new ApolloClient({
  link: ApolloLink.from([
    // Link chaining
    authLink,
    new HttpLink({ uri: endpointURL }),
  ]),
  cache: new InMemoryCache(),
});
```

### Caching

- `'no-cache'`: prevent caching

```js
client.query({ query, fetchPolicy: 'no-cache' });
```

- `update` will be called after executing mutation to modify the cache

```js
const query = gql`query`;

async function createJob(input) {
  const mutation = gql`mutation`;

  const {
    data: { job }
  } = await client.mutate({
    mutation,
    variables: { input },
    update: (
      cache, // or store
      { data } // from the graphql response
    ) => {
      // take the data from the response save it to the cache as if it was running specified query
      cache.writeQuery({
        query
        variables: { yo: data.yo },
        data
      });
    }
  });
}
```
