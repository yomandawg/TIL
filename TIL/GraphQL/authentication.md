# authentication with GraphQL

### Coupled GraphQL & Passport

| Browser |                                                 | GraphQL |                                    | Passport |
| :-----: | :---------------------------------------------: | :-----: | ---------------------------------- | -------- |
|         | request (_mutation_)&rarr;<br/>&larr;identified |         | request&rarr;<br/>&larr;identified |          |
|         |       identified&rarr;<br/>&larr;response       |         |

- mutation changes the status of authentication
- GraphQL handles the followup request once identified

### Decoupled GraphQL & Passport

| Browser |                                                   |  Server  |
| :-----: | :-----------------------------------------------: | :------: |
|  User   | authentication request&rarr;<br/>&larr;Identified | Passport |
|  User   |        Identified&rarr;<br/>&larr;response        | GraphQL  |

- no mutations (change) to authentication

#### Queries & Mutations

| Types |             Mutations             |
| :---: | :-------------------------------: |
| User  | `signup`<br/>`login`<br/>`logout` |

```javascript
const mutation = new GraphQLInputObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, args, request /*request from express*/) {
        // signup helper - presumably passport api
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, request) {
        // login helper - presumably passport api
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout(); // passport api
        return user;
      },
    },
  },
});
```

### Handling Cookies

- by default, GraphQL doesn't attach any information to the request that identifies the user to the backend server

* setup custom network interface for `ApolloClient`

```js
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin', // the request is from the same browser; safe to send cookies
  },
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (object) => object.id,
});
```

### live UI updates with authentication

- automatic re-render when changes made in authentication

```js
onLogoutClick() {
  this.props.logout({
    refetchQueries: [{ query: CurrentUser }] // refetching queries triggers re-rendering
  });
}
```

- _TIP_: pass Component methods as props

```js
<AuthForm onSubmit={this.onSubmit.bind(this)} />

// `Function.prototype.bind` creates a new function that has `this` keyword set to the provided value(object)
```

### redirection on authentication

- login or signup mutation &rarr; refetch current user &rarr; redirect to dashboard &rarr; dashboard reviews the auth state

* _CHALLENGES_

  1. redirection & refetch start at the same time
  2. refetch takes time to be executed
  3. redirect occurs instantaneously
  4. redirect &rarr; auth has not reached the dashboard &rarr; redirection to dashboard fails &rarr; refetch auth state complete

* _Solution_
  - components re-render on retrieving data from queries (use `componentWillUpdate`)
  - associate `LoginForm` with `CurrentUser` query &rarr; login mutation &rarr; `LoginForm` re-renders &rarr; redirect to dashboard

```js
componentWillUpdate(nextProps) {
  // this.props === the old, current set of props
  // nextProps === the next set of props that will be in place

  if (!this.props.data.user && nextProps.data.user) {
    // redirect to dashboard
    hashHistory.push('/dashboard');
  }
}
```

### auth required

- authentication required page

#### HOC (higher order components)

- reusing component logic: function that takes a component and returns a new component
- Component + HOC = _Enhanced_ or _Composed_ Component (addtional functionality)

* `RequireAuth` HOC

```js
export const RequireAuthHOC = (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
};
```

```js
<Route path="dashboard" component={RequireAuthHOC(Dashboard)} />
```
