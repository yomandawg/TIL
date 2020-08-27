# GraphQL Subscription

> operation type that uses _websockets_

### WebSocket API

- _two-way communication_ session between the browser and the server
- event-driven responses and systems

## Server

```bash
npm i graphql-subscriptions
```

- express.js server with apollo-server

```js
// index.js
const http = require('http'); // Node.js HTTP interface API

const app = expres();
app.use(/* middlewares */);

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: '/graphql' });

// create a server instead of the implicit express instance
const httpServer = http.createServer(app);

// enable websocket API to the apolloServer
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => console.log(`Server started on port ${port}`));
```

- resolver with apollo implementation of `PubSub`

```js
// resolvers.js
const { PubSub } = require('graphql-subscriptions');

const pubSub = new PubSub();

const Mutation = {
  addMessage: (_root, { input }) => {
    const message = /* message logic */;

    // publish for subscription
    pubSub.publish('MESSAGE_ADDED' /* event trigger */, {
      messageAdded /* graphql schema */: message
    });

    return message;
  }
};

const Subscription = {
  messageAdded: {
    // listen to the event asynchronously (websocket)
    subscribe: () => pubSub.asyncIterator('MESSAGE_ADDED')
  }
};
```

## Client

```bash
npm i apollo-link-ws subscriptions-transport-ws apollo-boost
```

- apollo-client

```js
// client.js
import { WebSocketLink } from 'apollo-link-ws';
import { ..., split } from 'apollo-boost'
import { getMainDefinition } from 'apollo-utilities';

const wsUrl = 'ws://localhost:9000/graphql';

// helper function - just copy & paste
function isSubscription(operation) {
  const definition = getMainDefinition(operation.query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
}

const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    lazy: true, // == start websocket ASAP: false (AKA optional use of websocket)
    reconnect: true
  }
});

// client setup
const client = new ApolloClient({
  link: split(isSubscription, /* if */ wsLink, /* else */ httpLink) // // wsLink || httpLink use
});
```

- queries & React Component

```js
async function onMessageAdded(handleMessage) {
  // initiate graphql subscription with the server
  const observable = client.subscribe({ query: messageAddedSubscription });

  // dispatch messages to the client application (component)
  return observable.subscribe(({ data }) => handleMessage(data.messageAdded));
}

// with React Component
async componentDidMount() {
  // with `observable.subscribe`, websockets continues to handle messages and trigger `setState` to update the component
  this.subscription = onMessageAdded((message) => {
    this.setState({ messages: this.state.messages.concat(message) });
  });
}

componentWillUnmount() {
  if (this.subscription) {
    this.subscription.unsubscribe(); // unsubscribe (close websocket) when Component closed
  }
}
```

## Inspecting with Chrome Dev Tools

> Network &rarr; WS tab

- websocket handshake

|       Client        |          Server          |
| :-----------------: | :----------------------: |
| HTTP Upgrade &rarr; |                          |
|                     | &larr; connection opened |

```http
headers
  Request Method: GET
  Status Code: 101 // switching protocols http <-> ws
  upgrade: websocket // changes connection to websocket
  Sec-webSocket-Protocol: graphql-ws // websocket will be used for graphql

messages
  received json messsages shown here
```

## websocket authentication

- websocket protocol is not an HTTP &rarr; cannot use HTTP headers (token) for authentication
- use the `payload` object of the handshake

```js
const wsLink = new WebSocketLink({
  options: {
    // `payload` object of the websocket handshake
    connectionParams: {
      accessToken: getAccessToken()
    }
  }
});
```

- solving async accessToken distribution problem

```js
function context(params) {
  const { req, connection /* from websocket */ } = params;

  // http context
  if (req && req.user) {
    return { userId: req.user.sub };
  }

  // websocket context
  if (connection && connection.context && connection.context.accessToken) {
    // self-decoding with jwt since `expressJwt` is http-based
    const decodedToken = jwt.verify(
      connection.context.accessToken,
      jwtSecret /* secret key */
    );
    return { userId: decodedToken.sub };
  }

  return {};
}

const wsLink = new WebSocketLink({
  options: {
    // execute the function instead of returning a static object
    connectionParams: () => ({
      accessToken: getAccessToken()
    }),
  }
}
```

```js
// resolvers.js
const Subscription = {
  messageAdded: {
    subscribe: (_root, _args, { userId } /* from context */) => {
      requireAuth(userId);
      return pubSub.asyncIterator(MESSAGE_ADDED);
    }
  }
};
```
