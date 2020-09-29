# Redux Saga

- redux middleware library for handling redux side effects
- ES6 `generators` for async flows

```js
// sagas.js
import { call, put, takeEvery, takeLastest } from 'redux-saga/effects';
import fetchUserApi from './apis';

function* incrementAsync() {
  yield call(delay, 1000); // middleware will supsend the Saga until the Promise completes
  yield put({ type: 'INCREMENT' }); // put Effect: dispatch an action; saga is pasued until the Effect is fulfilled
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync); // takeEffect: helper function to listen for dispatched action and run the worker
}

function* watchIncrementLatest() {
  yield takeLatest('INCREMENT_LATEST', incrementAsync); // takeLatest: helper function to cancel the pending action and run it again
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync(), watchIncrementLatest()]); // all: run multiple Effects in parallel
}
```

```js
// main.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store} /* redux store */>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
