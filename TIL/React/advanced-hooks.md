# Advanced Hooks

### useMemo

- returns a memoized value (referential equality)
- compares referential equality &rarr; produces a new value when the dependancy array changes

```js
// costly function
function slowFunction(num) {
  for (let i = 0; i < 10000000; i++) {}
  return num * 2;
}

function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // memoizing a infrequent & slowcast value
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number /* run the hook when this dependancy is changed */]);

  // only change the reference whenever the actual contents of the object has changed
  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : white,
      color: dark ? 'white' : 'black',
    };
  });
  // run only when the themeStyles object(content) is updated
  useEffect(() => {
    console.log('Theme changed');
  }, [themeStyles]);
}
```

### useCallback

> vs. `useMemo` &rarr; `useMemo` returns a memoized _value_ while `useCallback` returns a memoized _function_

- compares referential equality &rarr; produces a new function when the dependancy array changes
- also use when the function is heavy to create (just declare a function outside the component though)

```js
function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // recreate the function only when the `number` changes
  const getItems = useCallback(
    (
      incrementor /* unlike `useMemo` this is actually a callback function that's being returned, which allows passing paramters */
    ) => {
      return [number, number + incrementor];
    },
    [number]
  );

  const theme = {
    backgroundColor: dark ? '#333' : '#FFF',
    color: dark ? '#FFF' : '#333',
  };

  return (
    <div style={theme}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle theme
      </button>
      <List getItems={getItems} />
    </div>
  );
}

function List({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems(2));
    console.log('Updating Items');
  }, [getItems /* fire useEffect only when `getItems` function changes */]);

  return items.map((item) => <div key={item}>{item}</div>);
}
```

### useRef

> do not handle state updates or element manipulation with refs! - hard to keep track of the code and its state!

- similar to state but completely separate from the component (no rerendering on changing the value)
- use it as a container for keeping the previous state

```js
function App() {
  // const [renderCount, setRenderCount] = useState(1);
  const renderCount = useRef(1); // returns an object `{ current: 1 }`

  useEffect(() => {
    // fall into infinite loop since `setRenderCount` rerenders the component on updating
    // setRenderCount((prevRenderCount) => prevRenderCount + 1);
    renderCount.current = renderCount.current + 1; // keep track of a ref object
  });

  return <div>I rendered {renderCount} times</div>;
}
```

```js
function App() {
  const [name, setName] = useState('');
  const prevName = useRef('');

  useEffect(() => {
    prevName.current = name;
  }, [name]);
}
```

- referencing an HTML element or a React component
- each element has its own `ref` property

```js
function App() {
  // referencing  an element
  const inputRef = React.useRef();

  function focus() {
    console.log(inputRef.current); // exactly the same as document.querySelector
    inputRef.current.focus();
  }

  return (
    <>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={focus}>Focus</button>
    </>
  );
}
```

### useReducer

> flux with hooks

- another way to manage the state (complex state)
- set actions to perform on the state &rarr; convert the current state to a new version

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { count: 0 } /* initial state (complex state; object) */
  );

  function increment() {
    dispatch({ type: 'increment' });
  }

  function decrement() {
    dispatch({ type: 'decrement' });
  }

  return (
    <>
      <button onClick={decrement}>-</button>
      <span>{state.count}</span>
      <button onClick={increment}>+</button>
    </>
  );
}
```

---

#### subscriptions

- subscribe and unsubscribe from certain effects

```js
// upon mounting, a click event listener will be attaced to the window
useEffect(() => {
  const clicked = () => console.log('clicked!');
  window.addEventListener('click', clicked);

  // returned function within `useEffect` will be invoked when the component unmounts
  return () => {
    window.removeEventListener('click', clicked);
  };
}, []);
```

#### useState Optimization

- pass a function reference as opposed to invoking a function within `useState`

```js
const initialMojs = () => new mojs.Timeline();
const useClapAnimation = () => {
  const [animationTimeline, setAnimationTimeline] = useState(initialMojs);
};
```

#### useLayoutEffect

- identical to `useEffect` but fires synchronously after all DOM mutations

- cause a render &rarr; component renders or updates &rarr; screen is visually updated &rarr; `useEffect`(_asynchronously_) runs
- cause a render &rarr; component renders or updates &rarr; `useLayoutEffect`(_synchronously_) runs &rarr; screen is visually updated

#### callback Refs

- pass a function(`ref={setRef}`(_callback Refs_) instead of `ref={ref}` from `createRef()`
  - `setRef`(passed function) receives component instance or HTML DOM element as its argument
