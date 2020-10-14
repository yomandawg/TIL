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

---

## Middleware Theroy

### Monkeypatching

```js
const next = store.dispatch;
store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action);
  let result = next(action); // store.dispatch(action)
  console.log('next state', store.getState());
  return result;
};

const customAction = addTodo('use middlewares');
store.dispatch(customAction);
// dispatching 'use middlewares'
// next state { middlewares: True }
```

### Multiple transformations

```js
function patchStoreToAddLogging(store) {
  const next = store.dispatch;
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
  };
}

function patchStoreToAddCrashReporting(store) {
  const next = store.dispatch;
  store.dispatch = function dispatchAndReportErrors(action) {
    try {
      return next(action);
    } catch (err) {
      console.error('Caught an exception!', err);
      Raven.captureException(err, {
        extra: {
          action,
          state: store.getState(),
        },
      });
      throw err;
    }
  };
}

patchStoreToAddLogging(store); // changes the dispatch function
patchStoreToAddCrashReporting(store); // changes the dispatch function again
// dispatchAndReportErrors -> dispatchAndLog -> dispatch (reverse order)
```

### Hiding Monkeypatching

```js
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares
    .reverse()
    .forEach((middleware) => (store.dispatch = middleware(store))); // transform dispatch with each middleware
}
```

### Removing Monkeypatching

```js
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      return result;
    };
  };
}

// ES6
const logger = (store) => (next) => (action) => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const crashReporter = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState(),
      },
    });
    throw err;
  }
};

logger(store)(crashReporter)(action);
```
