# React Middlewares

- React &rarr; Action Creator &rarr; Action &rarr; **Middleware** &rarr; Reducer &rarr; State &rarr; React

```js
// a function that returns a function that returns a function
export default ({ dispatch, getState }) => (next) => (action) => {
  // dispatch | next or do something then dispatch | next
};
```

- async middleware example

```js
export default ({ dispatch }) => (next) => (action) => {
  if (!action.payload || !action.payload.then) {
    return next(action); // go to the next middleware or reducer
  }

  action.payload.then((response) => {
    const newAction = { ...action, payload: response };
    dispatch(newAction); // dispatch again
  });
};
```

- JSON Schema verifier

  - `npm i tv4` with _json-schema_

```js
export default ({ dispatch, getState }) => (next) => (action) => {
  next(action);

  if (!tv4.validate(getState(), stateSchema)) {
    console.warn('Invalid state schema detected');
  }
};
```
