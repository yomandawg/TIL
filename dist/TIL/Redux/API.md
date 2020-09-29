# Redux API

## Store

- based on the React Context

### Provider

- provides the `store` to any nested components wrapped in the `connect` function

```js
// StoreProvider.js
import { Provider } from 'react-redux';

const StoreProvider = ({ children, initialState = {} }) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(/* middlewares */)
  );

  return <Provider store={store}>{children}</Provider>;
};
```

```js
// index.js
ReactDOM.render(
  <StoreProvider /*initialState={state}*/>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
```

### Store Access (directly)

- the default context object

```js
import { ReactReduxContext } from 'react-redux';

const Component = () => {
  <ReactReduxContext.Consumer>
    {({ store }) => {
      // do something with the store
    }}
  </ReactReduxContext.Consumer>;
};
```

- `useStore` Hook returns the store instance from the default `ReactReduxContext`

---

## Connect

- connects the component to the store
- provides the component with the 1. data it needs from the store 2. functions for dispatching actions to the store
- `connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)`

### mapStateToProps

> `mapStateToProps?: (state, ownProps?) => Object`

- when specified, the component will subscribe to the store updates; any time the store is updated, `mapStateToProps` will be called
- returns an object which will be merged to the wrapped component's props
- pass `null || undefined` for no subscription

```js
// called whenever the store state changes
const mapStateToProps = (state) => ({ todos: state.todos });
// props.todo accessible

// called whenever the store state changes
// called whenever the wrapper component receives new props
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id],
});
```

- `stateProps` (returned Object)

  - determines whether the component will re-render
  - each field in the object will become a prop for the component

### mapDispatchToProps

- `store.dispatch` triggers an action: the only way for a state change
- never access the store directly; let `connect` do the reaching

1. connected component receives `props.dispatch` for manually dispatching
2. `mapDispatchToProps` lets creatign functions that dispatch when called, and pass them as props to the component

```js
connect(mapStateToProps, null)(MyComponent);
// the connected component will receive `dispatch` by default
```

```js
function MyComponent({ count, dispatch /* received prop */ }) {
  return <button onClick={() => dispatch({ type: 'ADD' })}>+</button>;
}
```

- provided `mapStateToProps` & `mapDispatchToProps`

```js
const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  };
};
```

```js
const TodoList = ({ todos, toggleTodo }) => (
  <div>
    {todos.map((todo) => (
      <button onClick={toggleTodo}>{todo}</button>
    ))}
  </div>
);
```

- forwarding arguments

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (event /* event argument from onClick function */) =>
      dispatch(doSomethingWith(event)),
  };
};
```

- `ownProps` with dispatch

```js
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleTodo: () => dispatch(toggleTodo(ownProps.todoId)),
  };
};
```

---

## Redux with Hooks

### useSelector()

> similar to `mapStateToProps`

- the selector will be run whenever the function component renders

```js
const MyComponent = () => {
  const counter = useSelector((state) => state.counter);
  return <div>{counter}</div>;
};

const TodoComponent = (props) => {
  const todo = useSelector((state) => state.todos[props.id]);
  return <div>{todos.text}</div>;
};
```

#### Memoizing

- a new instance of the selector is created whenever the component is rendered! &rarr; memoizing needed

```js
// react-redux.js.org/api/hooks
import { createSelector } from 'reselect';

const selectNumOfDoneTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.isDone).length
);

const DoneTodosCounter = () => {
  const NumOfDoneTodos = useSelector(selectNumOfDoneTodos);
  return <div>{NumOfDoneTodos}</div>;
};
```

### useDispatch()

```js
const CounterComponent = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>counter</button>
  );
};
```

- memoization

```js

```
