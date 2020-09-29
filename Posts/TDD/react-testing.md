# React Testing

- `create-react-app` &rarr; React + Webpack + Babel + **Jest**

## Jest

- `npm run test` &rarr; Jest starts up &rarr; executes tests in `/\.test\.js$/`

```js
globalTestingFunctionWithArbitraryName(/* string description of the test */, /* function containing the test logic */)
```

- create an environment (_Node.js_ runtime) &rarr; _Jest_ runs &rarr; simulate the browser behavior (_JSDOM_ library)

- React needs to run on the browser so need to provide the app with browser-like environment

```js
it('shows a comment box', () => {
  // create a fake JSDOM to simulate the browser behavior
  const div = document.createElement('div');

  // App Component produces HTML and nests it into the JSDOM `<div>`
  ReactDOM.render(<App />);

  // TEST LOGIC

  // remove a rendered React component from the DOM and clean up its handlers and state - performance related
  ReactDOM.unmountComponentAtNode(div);
});
```

- `ReactDOM.unmountComponentAtNode(div)` is for cleaning up leftover memory - running many tests may cause performance issue

* code reuse with `beforeEach` & `afterEach`

```js
let div;

beforeEach(() => {
  div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('div test #1', () => {
  expect(div).toDoSomething();
});

it('div test #2', () => {
  expect(div).toDoSomethingElse();
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(div);
});
```

## Enzyme

> testing package made specifically for React Components

```bash
npm i enzyme enzyme-adapter-react-16
```

```js
// src/setupTests.js

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adpater: new Adapter() });
```

- general _rendering methods_ instead of fake DOM

#### static

- render a component and return plain HTML

#### shallow

- render a component and none of its children

```js
it('shows a comment box', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.find(CommentBox).length).toEqual(1);
});
```

#### mount (full DOM)

- render a component and all of its children and allows interaction

```js
let wrapper;

beforeEach(() => {
  wrapper = mount(<CommentBox />);
});

afterEach(() => {
  wrapper.unmount(); // cleanup, similar to `ReactDOM.unmountComponentAtNode`
});

it('has a text area and a button', () => {
  expect(wrapper.find('textarea').length).toEqual(1);
  expect(wrapper.find('button').length).toEqual(1);
});
```

### Testing Strategy

1. find `textarea` element
2. simulate an event & provide a fake event object
3. force component update (since `setState` is synchronously updating the component)
4. assert that the value has changed

```js
it('has a text area that users can type in', () => {
  wrapper
    .find('textarea') // find the element
    .simulate('change', { target: { value: 'new comment' } }); // simulate a event & provide a fake event object
  wrapper.update(); // force component update

  expect(wrapper.find('textarea').prop('value')).toEqual('new comment'); // assert that the value has changed
});
```

- test reuse with `describe`

```js
describe('test reuse example', () => {
  beforeEach(() => {
    // scope of `beforeEach` is within `describe`
  });

  it('test #1', () => {
    // test code
  });

  it('test #2', () => {
    // test code
  });
});
```
