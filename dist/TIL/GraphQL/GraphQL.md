# GraphQL

- client has full control of which data it wants from the server
- explicit and custom _schema_ for fetching data
- versionless-API - modify API with custom queries

- vs. **REST**
  - gets _all the resource_ from that endpoint &rarr; _overfetching_
  - combining fetched datas need separate calls to the server; a single request can be insufficient &rarr; _undefetching_

### shortcomings of RESTful HTTP methods

> difficult to follow RESTful conventions with highly related data/endpoint

- DB table exmaple

| Property Name |        Type         |
| :-----------: | :-----------------: |
|      id       |         Id          |
|     name      |       String        |
|     image     |       String        |
| company_name  | String(foreign key) |
| position_name | String(foreign key) |

- notice that joining `company_name` and `position_name` with foreign key is hard to keep track of with RESTful conventions
- need to make tons of HTTP request to receive multiple `company` and `position` information
- confusing endpoints; `/users.23/friends/companies`? `/users/23/friends/12/company/name`?

* use _queries_ for requesting coupled datas!

```javascript
query {
  user(id: "23") {
    friends() {
      company {
        name
      }
    }
  }
}
```

- with apollo gql

```js
const { gql } = require('apollo-server');

// create an JS object with GraphQL logic functions
gql`
  type Query {
    greeting: String
  }
`;
```

## Example App

### Architecture

| GraphiQL  | Browser(Client) |
| :-------: | :-------------: |
|  Express  | GraphQL Server  |
| Datastore |       DB        |

| Client  |        |                              Server                               |
| :-----: | :----: | :---------------------------------------------------------------: |
| request | &rarr; | `if (GraphQL) return GraphQL response`</br>`else return response` |

- packages

```bash
npm install --save express express-graphql graphql lodash
```

### Server

```javascript
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  expressGraphQL.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Listening');
});
```

### Schema

- decsribe the properties & how datas are related to each other

```javascript
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
});
```

- Root Query (query receiver)

```javascript
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // if (user && id) return UserType
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // fetch actual data
        return _.find(users, { id: args.id });
      },
    },
    /* another type */
  },
});

// use as `schema`
module.exports = new GraphQLSchema({
  query: RootQuery,
});
```

- Nested Queries

```javascript
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then((res) => res.data);
      },
    },
  },
});
```

### Queries

- GraphQL query &rarr; Root Query &rarr; DataType

* Bidirectional Queries
  - users &harr; companies
  - `users/1/company` or `/companies/1/users`

```javascript
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: (/* closure problem solver */) => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then((res) => res.data);
      },
    },
  }),
});
```

- GraphQL queries

```ts
query example {
  apple: company(id: "2") {
    ...companyDetails
    users {
      firstName
    }
  }
  google: company(id: "2") {
    ...companyDetails
    users {
      firstName
    }
  }
}
```

- fragments

```ts
query JobQuery($id:ID!) {
  job(id:$id){
    ...JobDetail
  }
}

fragment JobDetail on Job {
  id
  title
  company{
    id
    name
  }
  description
}
```

### Mutations

- mutation &rarr; `Mutations` object &rarr; modifyData

```javascript
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age }) {
        return axios
          .post('http://localhost:3000/users', { firstName, age })
          .then((res) => res.data);
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`)
          .then((res) => res.data);
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then((res) => res.data);
      },
    },
  },
});
```

- mutation query

```ts
mutation {
  deleteUser(id: "40") {
    # expect null for deletion
    id
    firstName
    age
  }
}
```

- query variables

```ts
mutation AddSong($title: String) {
  addSong(title: $title) {
    id
    title
  }
}

{
  "title": "Sprite vs Coke"
}
```
