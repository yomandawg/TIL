# apollo-client

> framework agnostic

### Architecture

|          Architecture           |
| :-----------------------------: |
| Apollo Provider<br/>_React App_ |
|             &varr;              |
|          Apollo Store           |
|             &varr;              |
|          GraphQL Serer          |

- _Provider_ will take data from _Store_ and inject it into the _React App_
- Apollo fetches data from Apollo Store with specified dataType

### Index

- React `index.js`

```javascript
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo'; // the Provider will take care of the react<->store stuff

const client = new ApolloClient({}); // similar to `redux store`

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  );
};
```

### Component

- GraphQL Component with `graphql-tag` query

```javascript
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        // query variables
        variables: {
          title: this.state.title
        }
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
```

- _render_ component &rarr; GraphQL query executed &rarr; fetch data &rarr; _re-render_ component

### Cold Cache vs. Warm Cache

- Cold Cache
  - create Song &rarr; go to SongList &rarr; run query &rarr; Songs fetched
- Warm Cache
  - fetch Songs &rarr; Songs fetched &rarr; create Song &rarr; go to SongList &rarr; use cached data &rarr; new Song not rendered

* Apollo Store has `SongList` tied to already fetched songs (default)
* need to tell Apollo that the new data needs to be rendered (instruct Apollo to re-fetch)

```javascript
this.props.mutate({
  variables: {
    title: this.state.title
  },
  refetchQueries: [{ query }]
});
```

```javascript
// when GraphQL knows that query is associated with the prop and component
this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch());
```

### Passing query variables

- in the `this.props.mutate`, easily pass in the variables and other options since we arbitrarily execute the mutation query

```javascript
this.props
  .mutate({
    variables: {
      title: this.state.title
    },
    refetchQueries: [{ query: fetchSongs }]
  })
  .then(() => {
    hashHistory.push('/');
  });
```

- however, within `graphql(query)(Component)` pattern, hard to pass variables to the query, since the query is executed automatically by the `graphql` object

- Apollo fetches data from the Apollo Store with specified dataType
- however, Apollo does not know if the data is updated or if the data is related to anything

* to identify every received piece of data with `id`
* every time there's an update to the `id` of certain data (executed query), update the `object` (React side)
  - need to provide id's to every executed query (mutation)

**DEPRECATED**

```javascript
// Apollo Store
const client = new ApolloClient({
  dataIdFromObject: (object) => object.id // every piece of data runs through this
});
```

```javascript
export default gql`
  mutation AddLyricToSong($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id # need to provide id's to every executed query (mutation)
        content
      }
    }
  }
`;
```

```javascript
export default graphql(createSong, {
  options: (props) => {
    variables: {
      id: props.params.id;
    }
  }
})(SongCreate);
```

| query variable hierarchy |
| :----------------------: |
|       ReactRouter        |
|      `props` &darr;      |
|        `graphql`         |
|      `props` &darr;      |
|       `SongDetail`       |

- `graphql` passes `props` to `SongDetail`, not ReactRouter

### Optimistic Responses (Updates)

- mutation &rarr; _anticipate_ response &rarr; UI updates &rarr; response &rarr; _correct_ UI updates

```javascript
onLike(id, likes /* property to anticipate */) {
    this.props.likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

export default compose(
  graphql(LikeLyric, { name: 'likeLyric ' }) // custom name for mutation (e.g. handling multiple mutations)
)(MyComponent);
```

## Tips

- debugging

```javascript
debugger;

// @browser console

res.graphQLErrors;

res.graphQLErrors.map((error) => error.message);
```

```js
this.props
  .mutation({
    // mutation options
  })
  .catch((res) => {
    const errors = res.graphQLErrors.map((error) => error.message);
  });
```

### graphqlRequest function

```js
// code reusability
async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });

  const responseBody = await response.json();

  // Error handling
  if (responseBody.errors) {
    const message = responseBody.errors
      .map((error) => error.message)
      .join('\n');
    throw new Error(message);
  }

  return responseBody.data;
}
```
