# Redux

## Cycle

> Action Creator &rarr; Action &rarr; dispatch &rarr; Reducers &rarr; State

- you can only modify the state of the data through the use of dispatch function and the action creators

1. Action Creator - factory that creates an action
2. Action - a payload of information with an intention to change the state
3. Dispatching Function - accepts an action that triggers a state change
4. Reducers - specify how the application's state changes
5. State - the single state value that is managed by the store

### Example

```javascript
const { createStore, combineReducer } = Redux;

// Action Creator
const createPolicy = (name, amount) => {
  return {
    type: 'CREATE_POLICY', // type required
    payload: { name, amount } // payload optional
  }
}

// Reducer
const policies = (listOfPolicies = [] /* default value */, action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name]; // always return a newly made object to make ease of time travel debugging
  } else if (/* another condition */) ) {
    // another action
  }
}

const ourDepartments = combineReducers({
  /* Reducers */
  accounting,
  claimHistory,
  policies
})


// store factory
const store = createStore(ourDepartments);

// Action
// each dispatch of an action goes through the entire cycle of redux
store.dispatch(/* action creator */)
// => update the whole state
```

---

## react-redux

> Provider &rarr; App &rarr; Connnect &rarr; Components

- integration layer of react and redux

1. Provider - a delegate for handling the store
2. App
3. Connect - communicate with the store
4. Components

### Provider

- make `store` available to any nested components that have been wrapped with `connect` function

```javascript
const stroe = createStore();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Example

```javascript
class SongList extends Component {
  componentDidMount() {
    this.props.selectSong(); // do something with action creators
  }

  renderList() {
    // helper function to handle props
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

// maps state to props when the component is called
const mapStateToProps = (state) => {
  return { songs: state.songs /* states to pass onto props */ };
};

// can increase reusability with ownProps
const mapStateToProps = (state, ownProps) => {
  return { songs: state.songs.find((song) => song.id === ownProps.songId) };
};

// action creator -> action -> connect -> dispatch
// returns a new, connected component class that wraps the component you passed in.
export default connect(mapStateToProps, {
  selectSong /* action creators to pass onto props */,
})(SongList);
```

```javascript
// @actions/index.js : action creator error example
export const fetchPosts = async () => {
  // bad approach: actions must be plain objects => use custom middleware for async's
  const response = await jsonPlaceholder.get('/post'); // THROW ERROR!

  return {
    type: 'FETCH_POSTS',
    payload: response, // need to return a plain javascript object
  };
};
```

- above example looks as if the action is returning a valid javascript object => IT IS NOT.
- when the JS code is compiled back to the ES2015 code, the `async`-`await` syntax is not returning a plain javascript object
- the returned random action object will then dispatched into reducers which will cause an error

## redux middleware

> action creator &rarr; action &rarr; dispatch &rarr; **middleware** &rarr; reducers &rarr; state

- middleware to help make requests in a redux app (normally within the _action creators_)
- called with dispatched action
- stop, modify, async for actions

### redux-thunk

- action creators can return **functions**
  &rarr; invokes the function with `dispatch`(change data) and `getState`(read data) as its arguments

```javascript
// @App.js
const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(<App store={store} />, document.querySelector('#root'));
```

- useful for making request (`async`) by manually dispatching action

```javascript
// @actions
// able to return a function
export const fetchPosts = () => async (dispatch, getState) => {
  const response = await jsonPlaceholder.get('/post');

  dispatch({ type: 'FETCH_POSTS', payload: response }); // manually dispatching
};
```

### redux-promise

- action creators can return **promise**
- simpler form of `redux-thunk` (no manual dispatching)

```js
// actions

export function fetchComments() {
  const response = axios.get('http://jsonplaceholder.typicode.com/comments');

  return {
    type: FETCH_COMMENTS,
    payload: response, // return a promise
  };
}
```

## Reducers

1. redux invokes every reducers one time on booting to specify the initial state

- like ZIR + ZSR in electrical circuit system
- reducer must return a **defined** value

```javascript
// define the initialState pseudo-code
Reducer = (defaultInput, firstAction) => {
  if (defaultInput is undefined) return initialState
  else { /* go onto next step */ }
}
```

2. next time the reducer is called, it will return the new state(_version 2_) based on previous state and the next action
3. will only return the computation of input state + action argument (no outside action involving)
4. never directly mutate the input state argument

- be caustious of returning the same referenced state even after modification

```javascript
//  check if the states has the same reference and value
hasChanged = false || nextStateForKey !== previousStateForKey;
// return the changed state or the old state
return hasChanged ? nextState : state;
// => redux will not recognize changes in state if you simply mutate the state
// => when redux recognizes the state change => re-render
```

#### Recommended practices

```javascript
state.pop()           state.filter(element => element !== 'hi)
state.push('hi')      [...state, 'hi']
state[0] = 'hi'       state.map(el => el === 'hi' ? 'bye' : el)
state.name = 'yo'     {...state, name: 'yo'}
delete state.name     {...state, age: undefined} || _.omit(state, 'age')
```

## redux-form

```js
import { reduxForm, Field } from 'redux-form';

class Signup extends Component {
  onSubmit = (formProps) => {
    console.log(formProps);
  };

  render() {
    const { handleSubmit /* from redux-form */ } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component="input" />
        </fieldset>
        <button>Sign up!</button>
      </form>
    );
  }
}

export default reduxForm({ form: 'signup' })(Signup);
```

- `compose` helper

```js
import { compose } from 'redux';

export default compose(connect(...), reduxForm(...))(Signup);
```
