# React

## React(App) Component

> the _App function_

### App Component

> returns JSX and handles events

- **Functional** components
  - produce JSX to show content
- **Class** components (_legacy_) || Function components with **Hooks**
  1. produce JSX to show content
  2. use the Lifecycle Method system to run code at specific points in time
  3. use the _state_ system to update content

#### Nesting (component hierarchy)

- a component can be shown inside of another - `<MyComponent />`

#### Reusablity

- easily reusable componenet

#### Configuration

- configure componenet when it's created

### Function Component

```javascript
// example
export default function App() {
  /*
    event handling
  */

  const buttonText = 'Click Me!';
  function getButtonText() {
    return 'Javascript Function'
  }

  return (
    // the JSX = HTML elements + other components
    <div>
      <Field label="Enter English" onChange={setText} value={text} />
      <input className="name" id="name" type="text" /> // `className` to avoid collision with `class` keyword in JS
      <hr />
      <button style={{ backgroundColor: 'blue', color: 'white' }}>
        {buttonText} // referencing variables
      </button>
      <h1>{getButtonText()}<h1/> // referencing functions
    </div>
  );
}
```

### Class Component

```javascript
class App extends React.Component {
  constructor(props) {
    super(props) // inherit props from React.Component

    // the only time for direct assignment of `this.state`
    // state must be initialized on creation
    this.state = { ... /* states */ , errorMessage: '' /* for re-rendering on errors */ };

    // do something
  }

  render() {
    // do something
  }
}
```

```js
class MyComponent extends React.Component {
  // use constructor when you want to save props data into state
  constructor(props) {
    super(props);
    this.state = {
      fromProps: props.fromProps
    };
  }
}
```

```javascript
// shorthand syntax
class App extends React.Component {
  state = { /* states */ } // babel builds the constructor anyways
  ...
}
```

- binding `this` to the class method

```javascript
class SearchBar extends React.Component {
  constructor() {
    // 1. bind `this` to the methods on creation of the class
    this.thisExample = this.thisExample.bind(this);
  }

  thisExample = (event) => {
    // 2. arrow function binds `this` to the object in which it was called on
  };

  render() {
    return (
      // 3. using the arrow function inside JSX object to pass on the `this` bound function
      <form onSubmit={(e) => this.thisExample(e)} />
    );
  }
}
```

### Lifecycle

1. JS file loaded by the browser &rarr; compiled by _babel_
2. App component gets created
3. App returns JSX, renders HTML DOM

#### Component Lifecycle

&rarr; `constructor` (new instance is created) - one time setup\
&rarr; `render` (content visible) - return _JSX_\
&rarr; `componentDidMount` (calls on the _initial_ rendering) - data-loading\
&rarr; `componentDidUpdate` (calls when _re_-renders) - data-loading on state/props change\
&rarr; `componentWillUnmount` (calls right before the lifecycle ends) - cleanup

```javascript
class App extends React.Componet {
  constructor(props) {
    /* TODO: one time setup */
    super(props)
    this.state = { /* state object */ }
    // do something
  }

  render() {
    /* TODO: return JSX */
    // do something
    return ( /* JSX */ )
  }

  componentDidMount() {
    /* TODO: data-loading */
    // the component was rendered for the first time
  }
  componentDidUpdate() {
    /* TODO: data-loading on state/props change */
    // the component was updated (re-rendered)
  }
  componentWillUnmount() {
    /* TODO: cleanup (also non-React stuff) */
    // the component lifecycle is about to end
  }
}
```

### JSX

> instructions to tell React what content to show\

- special form of JS: HTML elements + other componenets

1. create a normal HTML element

- `div` `span` `h1` `table` ...

2. show another component

- `Field` `Translate` `Languages`

```javascript
<div> // DOM element found => show `div` on the screen
  <Field /> // component found => call the component function => inspect the outcome JSX
  ...
```

### React vs ReactDOM library

- React (the _reconciler_) - work with components
- ReactDOM (the _renderer_) - discrete what to show and render HTML DOM elements

## Props

```javascript
const Spinner = (props) => {
  return <div>{props.message}</div>;
};

// provide default properties
Spinner.defaultProps = {
  message: 'Loading...'
};
```

## State

- usable with `class` components or `function` components with `hooks`
- JS object that contains data relevant to a component
- updating the state causes the component to instantly rerender

### useState

- the _state_ system
- keep track of (stores) the dynamic data
- used to update the HTML

```javascript
import { useState } from "react";
...
const [language, setLanguage] = useState("ru");
const [text, setText] = useState("");
```

## Refs

- gives access to a single DOM element
- create and assign refs in the constructor to instance variables => pass to JSX as props
- the `ref` receives the underlying DOM element as its current property

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    // pass as props
    return <div ref={this.myRef} />;
  }
}

const node = this.myRef.current; // accessing that node
```

```js
function MyComponent(props) {
  const myRef = React.createRef();

  useEffect(() => {
    console.log(myRef.current); // the div#1 element
  });

  return (
    <div id={1} ref={myRef}>
      div #1 element
    </div>
  );
}
```

### external HTML inside JSX

```javascript
<span dangerouslySetInnerHTML={{ __html: /* HTML script */ }}></span>
```

- vulnerable for _XSS_ attacks
