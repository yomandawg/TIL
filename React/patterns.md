# React Patterns

## Redux data handling flow
**Redux store** &rarr; `mapStateToProps` &rarr; **Component**(`props`)&nbsp;&nbsp;&nbsp;&nbsp; &rarr; **DOM**(`value`)\
**Redux store** &larr; `Action Creator`&nbsp;&nbsp; &larr; **Component**(`handler`) &larr; **DOM**(`onChange`)

## Action Creators inside a Action Creator
```javascript
// @actions/index.js
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPost()); // dispatch an action creator

  // getState callback object accesses the refreshed state
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id))); // dispatch for each unique id's

  // with lodash chaining
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
}
```

## redux-form
> hooking up to the view(form) for easier store-component data handling\
```javascript
class StreamCreate extends React.Component {
  // component with a controlled element
  renderInput = (/*formProps*/ { input, label, meta }) => {
    // return (
    //   <input
    //     onChange={formProps.input.onChange}
    //     value={formProps.input.value}
    //   />
    // );
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} />
      </div>
    );
  }

  onSubmit(formValues) {
    // do something
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  // custom errors
  return errors;
}

export default reduxForm({
  form: 'streamCreate', // form name
  validate
})(StreamCreate);
```
```javascript
// for StreamForm `initialValues` (reduxForm special props)
<StreamCreate
  initialValues={{ /* default value for `<Field />` */ }}
  onSubmit={this.onSubmit}
/>
```


### Reducer Types
```javascript
// Array-based approach
const streamReducer = (state=[], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map(stream => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });
    default:
      return state;
  }
}

// Object-based approach
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      const newState = { ...state }; // create a brand-new object with the same key-value pairs
      newState[action.payload.id] = action.payload
      return newState;
    default:
      return state;
  }
}

// Shorthand syntax with ES2015 key interpolation
const streamReducer = (state={}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
```

## React.Fragment
* prevent the wrapping element of JSX to be invisible and doesn't have any impact on the DOM
```javascript
// possible CSS issue
return (
  <div>
    <button />
    <button />
  </div>
);

// solution
return (
  <React.Fragment> // <>
    <button>
    <button />
  <React.Fragment /> // </>
)
```