# Hooks

> _React v16.8_&nbsp;

- additional functionality to _function components_
- reusabliity

## Prebuilt Hooks

### useState

> `state` in a functional component

```javascript
const [
  /* piece of state */
  /* function to change this state */
] = useState(/* inital value for this state */);
```

|                 | **Class Components**                 | **Function Components** |
| --------------- | ------------------------------------ | ----------------------- |
| _Intialization_ | `state = { activeIndex: 0 }`         | `useState(0)`           |
| _Reference_     | `this.state.activeIndex`             | `activeIndex`           |
| _Updates_       | `this.setState({ activeIndex: 10 })` | `setActiveIndex(10)`    |

```js
const [activeIndex, setActiveIndex] = useState(0);
```

- when calling `setActiveIndex` => **entire component will be rerendered**

### useEffect

> _lifecycle method_; perform side effects

- `useEffect` runs after every render - effects happen after render
- React _guaranteeds the DOM has been updated_ by the time effect runs
- React remembers the effect sync &rarr; function passed to `useEffect` is different on every render

```js
useEffect(
  () => {
    // recommeded approach for asyncs
    (async () => {
      await axios.get(/* some URL */);
    })();

    // directly handling Promises
    axios.get(/* some URL */).then((res) => {
      // do something
    });
  },
  [
    /* second argument */
  ]
);
```

- component is rendered for the &rarr; `second argument`

  1. first render, `[]`
  2. every render, `null`
  3. on data change, `[data]`

- the previous **cleanup** function will be called when the component is rerendered (**_when the component is removed_**) and `useEffect` is re-called

```javascript
useEffect(() => {
  // cleanup function
  return () => {
    // this function is called when `useEffect` is re-called or component is unmount
  };
});
```

- useful `setTimeout` pattern with `useEffect`

```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // do something
  }, 1000);

  return () => clearTimeout(timeoutId);
});
```

- debouncing pattern with two `useEffect` running

```js
const [term, setTerm] = useState('programming');
const [debouncedTerm, setDebouncedTerm] = useState(term);
const [results, setResults] = useState([]);

useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedTerm(term);
  }, 1000)

  return () => {
    clearTimeout(timerId);
  };
}, [term]);

useEffect(() => {
  const search = async () => {
    const { data } = await axios.get(/* request URL */, {
      searchFor: debouncedTerm
    });

    setResults(data.search);
  };

  search();
}, [debouncedTerm]);
```

### useRef

> `ref` in a function component

- returns a ref object initialized with the passed argument

```js
const myRef = useRef(initialValue || null);
```

#### Refs

> access DOM nodes or React elements created in the `render` method

- interact with children in addition to `props`

```js
myRef = React.createRef();

useEffect(() => {
  this.myRef.current // the <div> element
})

render() {
  return <div ref={this.myRef} />;
}
```

#### Dropdown component problem

- a way to detect a click event on any element besides one it created
- set up a manual event listener (without React) on the body element => a click on any element will bubble up to the body

```js
useEffect(() => {
  document.body.addEventListener('click', () => {
    setOpen(false);
  });
}, []);
```

```js
<body>
  <ReactComponent>
    <div>
      <div2 onClick={() => setOpen(!open)}></div2>
    </div>
  </ReactComponent>
</body>
```

- bubbling order **with React component** when clicking `<div2>`
  1. `<body>`
  2. `<ReactComponent>`
  1) `<div2>`
  2) `<div1>`
- problem with this: `setOpen` will be called twice and set the `open` state back to what it was

- `useRef` - direct reference to a DOM element

```js
const Dropdown = ({ options, selected, onSelectedChange }) => {
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (ref.current.contains(event.target)) {
        return; // return early if target is not the correct ref
      }
      setOpen(false);
    });
  }, []);

  return <div ref={ref}>/* other JSX */</div>;
};
```

## Custom Hook

> create a _reusable_ custom hook on top of prebuilt hooks

- choose formal `input` and `output` to return

```js
// example
const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, []);

  const search = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    });

    setVideos(response.data.items);
  };

  return [videos, search]; // React convention
};
```

## Note

#### ensure all state to be clear

- only call hooks at the top level
  - don't call hooks inside looks, conditions, or nested functions
  - ensure that Hooks are called in the same order
  - correctly preserve the state between multiple hooks
- only call hooks from react functions
  - only call Hooks from React function components or custom Hooks
