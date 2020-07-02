# Redux

## Cycle
> Action Creator &rarr; Action &rarr; dispatch &rarr; Reducers &rarr; State\
* you can only modify the state of the data through the use of dispatch function and the action creators

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
> Provider &rarr; App &rarr; Connnect &rarr; Components\
* integration layer of react and redux

1. Provider - a delegate for handling the store
2. App
3. Connect - communicate with the store
4. Components

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
const mapStateToProps = state => {
  return { songs: state.songs /* states to pass onto props */ };
};

// action creator -> action -> connect -> dispatch
export default connect(
  mapStateToProps, 
  { selectSong /* action creators to pass onto props */ }
)(SongList);
```
```javascript
// @actions/index.js : action creator error example
export const fetchPosts = async () => {
  // bad approach: actions must be plain objects => use custom middleware for async's
  const response = await jsonPlaceholder.get('/post'); // THROW ERROR!

  return {
    type: 'FETCH_POSTS',
    payload: response // need to return a plain javascript object
  };
}
```
* above example looks as if the action is returning a valid javascript object => IT IS NOT.
* when the JS code is compiled back to the ES2015 code, the `async`-`await` syntax is not returning a plain javascript object
* the returned random action object will then dispatched into reducers which will cause an error

## redux-thunk
* middleware to help make requests in a redux app (normally within the *action creators*)