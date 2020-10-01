# Testing with Redux

- since enhanced component with redux `connect` looks for a `Provider` & `store`, we need to provide it to the testing component

1. provide store directly to the testing component

```js
beforeEach(() => {
  wrapper = mount(
    <Provider store={createStore(reducers, {})}>
      <CommentBox />
    </Provider>
  );
});
```

2. use `props.children` root component pattern

```js
// Root.js

export default ({ children, initialState = {} }) => {
  return (
    <Provider store={createStore(reducers, initialState)}>{children}</Provider>
  );
};
```

```js
// index.js

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);
```

```js
// CommentBox.test.js

beforeEach(() => {
  const initialState = { someState };

  wrapper = mount(
    <Root initialState={initialState}>
      <CommentBox />
    </Root>
  );
});
```

## Integration Test

> test multiple units together

### moxios

> `npm i moxios`

- problem with `axios` inside the Jest testing environment - cannot make ajax requests within JSDOM test suite
- trick `axios` with `moxios` with a fake response

```js
beforeEach(() => {
  // moxios intercepts any request issued by axios
  moxios.install();

  // intercept request going to this url and return a fabricated response
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }],
  });
});

afterEach(() => {
  // cleanup
  moxios.uninstall();
});
```

- need to take care of the delay with a _pause_ since the test goes on right away before the moxios promise is resolved (`done` callback when finished)

```js
it('can fetch a list of comments and display them', (done) => {
  // Attempt to render the entire app
  const wrapper = mount(
    <Root>
      <App />
    </Root>
  );

  wrapper.find('.fetch-comments').simulate('click'); // clarify custom class for easier finding

  // pause
  setTimeout(() => {
    wrapper.update();
    expect(wrapper.find('li').length).toEqual(2);

    done(); //letting know that the test is done
    wrapper.unmount();
  }, 100);
});
```

- built-in moxios `wait` function

```js
moxios.wait(() => {
  wrapper.update();
  expect(wrapper.find('li').length).toEqual(2);

  done(); // letting know that the test is done
  wrapper.unmount();
});
```
