# Hooks
> *React v16.8*&nbsp;
* additional functionality to *function components*
* reusabliity

## Prebuilt Hooks

### useState
> `state` in a functional component&nbsp;
```javascript
const [/* piece of state */, /* function to change this state */] = useState(/* inital value for this state */)
```
| | **Class Components** | **Function Components** |
| - | - | - |
| *Intialization* | `state = { activeIndex: 0 }` | `useState(0)` |
| *Reference* | `this.state.activeIndex` | `activeIndex` |
| *Updates* | `this.setState({ activeIndex: 10 })` | `setActiveIndex(10)` |
* when calling `setActiveIndex` => __entire component will be rerendered__


### useEffect
> *lifecycle methods* similars in a functional component&nbsp;
* component is rendered for the... `second argument`
```javascript
useEffect(() /* cannot state an async function */ => {
  // recommeded approach
  (async () => {
    await axios.get(/* some URL */);
  })();
  // directly handling Promises
  axios.get(/* some URL */)
      .then((res => {
        // do something
      }));
}, [/* second argument */]);
```
1. first time, `[]`
2. first time && rerenders, `null`
3. first time && rerenders && with data change, `[data]`(changed)

* the previous **cleanup** function will be called when the component is rerendered (__*when the component is removed*__) and `useEffect` is re-called
```javascript
useEffect(() => {
  // cleanup function
  return () => {
    // this function is called when `useEffect` is re-called
  }
})
```
* useful `setTimeout` pattern with `useEffect`
```javascript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // do something
  }, 1000)

  return () => clearTimeout(timeoutId)
})
```
* debouncing pattern with two `useEffect` running
```javascript
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
> `ref` in a function component&nbsp;

#### Dropdown component problem
* a way to detect a click event on any element besides one it created
* set up a manual event listener (without React) on the body element => a click on any element will bubble up to the body
```javascript
useEffect(() => {
  document.body.addEventListener('click', () => {
    setOpen(false);
  });
}, []);
```
```html
<body>
  <ReactComponent>
    <div>
      <div2 onClick={() => setOpen(!open)}>
      </div2>
    </div>
  </ReactComponent>
</body>
```
* bubbling order __with React component__ when clicking `<div2>`
  1. `<body>`
  2. `<ReactComponent>`
    1) `<div2>`
    2) `<div1>`
* problem with this: `setOpen` will be called twice and set the `open` state back to what it was

* `useRef` - direct reference to a DOM element
```javascript
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

  return (
    <div ref={ref}>
      // other JSX
    </div>
  );
};
```

## Custom Hook
> create a *reusable* custom hook on top of prebuilt hooks\
* choose formal `input` and `output` to return
```javascript
// example
const useVideos = defaultSearchTerm => {
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    search(defaultSearchTerm);
  }, []);

  const search = async term => {
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