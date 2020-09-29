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
    },
  },
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
  path: '/graphql' /* graphql server endpoint */,
});
```

- typeDefs

```js
// schema.graphql
type Query /* Root query */ {
  job(id: ID!): Job // query variable
  jobs: [Job]
}

type Company {
  id: ID!
  name: String
  description: String
}

type Job {
  id: ID!
  title: String
  company: Company
  description: String
}g: String
}

// type
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
```

- resolvers

```js
// resolvers.js - fetching methods
const resolvers = {
  // Root query
  Query: {
    job: (root, { id }) => db.jobs.get(id), // variable resolver
    jobs: () => db.jobs.list(),
  },
  Job: {
    company: (job) => db.companies.get(job.companyId),
  },
};
```

### client fetching example

```js
export async function loadJob(jobId) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `query JobQuery($id: ID!) {
        job(id: $id){
          id
          title
          company {
            id
            name
          }
          description
        }
      }`,
      variables: { jobId },
    }),
  });

  const responseBody = await response.json();
  return responseBody.data.job;
}
```

## Mutations

- a root type schema for modifying data

```ts
// schema.graphql
type Mutation {
  createJob(companyId: ID, title: String, description: String): ID
}
```

```js
// resolvers.js
const Mutation = {
  createJob: (root, {companyId, title, description}) => {
    const id = db.jobs.create({companyId, title, description})
    return db.jobs.get(id);
  }
},
```

```js
gql`
  mutation CreateJob($companyId: ID!, $title: String!, $description: String!) {
  /* can name a return object */ job: createJob(companyId: $companyId, title: $title, description: $description) {
    id
    title
    company {
      id
      name
    }
  }
}`;
```

#### `input` pattern

```ts
type Mutation {
  createJob(input: CreateJobInput): Job
}

input CreateJobInput {
  companyId: ID
  title: String
  description: String
}
```

```js
Mutation: {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  };
}
```

```js
gql`
  mutation CreateJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

// variables
{
  "input": {
    "companyId": "SJV0-wdOM",
    "title": "fullstack",
    "description": "fullstack engineer!"
  }
}
```

### context

- context object provided by the apollo-server application
- able to access `request` inside the GraphQL applicaiton

```js
// index.js
const context = ({ req }) => {req;

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
```

- **http headers** in GraphQL query

```json
{
  "authorization": "Bearer token"
}
```

- express server with jwt authorization
  - express-jwt sets `user` property into the `request` with distributed token

```js
app.post('/login', (req, res) => {
  /*
    verification process
  */

  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token }); // response with token
});
```

- resolver example

```js
// resolvers.js
Mutation: {
  createJob: (root, { input }, context) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }
    // do something
  };
}
```

- client-side request (localStorage token example)

```js
async function login(email, password) {
  const response = await fetch(loginEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('accessToken', token);
  }

  return response.ok;
}

function logout() {
  localStorage.removeItem('accessToken');
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function isLoggedIn() {
  return !!localStorage.getItem('accessToken');
}

const request = {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ query, variables }),
};

if (isLoggedIn()) {
  request.headers['authorization'] = 'Bearer ' + getAccessToken();
}

const response = await fetch(endpointURL, request);
```
