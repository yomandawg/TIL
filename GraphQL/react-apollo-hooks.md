# React Apollo with Hooks

```bash
npm i @apollo/react-hooks
```

- `ApolloProvider` setup

```js
// App.js
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';

render() {
  return (
    <ApolloProvider client={client}>
      <Components />
    </ApolloProvider>
  );
}
```

#### useQuery

```js
// myComponent.js
import { useQuery } from '@apollo/react-hooks';

const myComponent = () => {
  // useQuery triggers 'reloading' the component
  const { loading, error, data } = useQuery(someQuery, options);

  // same as...
  // setResult triggers 'reloading' the component
  const [result, setResult] = useState({ someProperty: true });
  client
    .query({ query: someQuery, options })
    .then(({ data }) => setResult({ someProperty: false, data }));
};
```

```js
useQuery(someQuery, {
  onCompleted: (data) => {
    // do something with the data
  }
});
```

#### useMutation

```js
const [
  mutation /* mutation function */,
  { loading, error, data, called } /* make use of when mutation called */
] = useMutation(someMutation);
```

#### useSubscription

- unscribes automatically

```js
const { data } = useSubscription(someSubscription, {
  onSubscriptionData: (data) => {
    // do something with the data
  }
});
```

- chat app pattern

```js
// custom hook
function useChatMessages() {
  const [messages, setMessages] = useState([]);

  useQuery(messagesQuery, {
    onCompleted: ({ messages }) => setMessages(messages)
  });

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(messages.concat(subscriptionData.data.messageAdded));
    }
  });

  const [addMessage] = useMutation(addMessageMutation);

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } })
  };
}
```

## Local state management

> use Apollo cache (Apollo client) as the central store

- `client.writeData` writes directly to the cache and re-renders the component
- fetch data + local update

```js
const { data } = useQuery(messagesQuery);
const messages = data ? data.messages : [];

useSubscription(messageAddedSubscription, {
  onSubscriptionData: ({
    client /* the apollo client */,
    subscriptionData
  }) => {
    client.writeData({
      data: {
        // data needs to be in the same structure as the query-retrieved data
        messages: messages.concat(subscriptionData.data.messageAdded)
      }
    });
  }
});
```
