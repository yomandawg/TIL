# Redux Patterns

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