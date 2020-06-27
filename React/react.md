# React

## React(App) Component
> the *App function*\
* *App Component* - returns JSX and handles events\
  => **JSX** (the HTML-like codes) - instructions to tell React what content to show

* **Functional** components
  - produce JSX to show content
* **Class** components (*legacy*) || Function components with **Hooks**
  1. produce JSX to show content
  2. use the Lifecycle Method system to run code at specific points in time
  3. use the 'state' system to update content

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
    this.state = { lat: null };

    window.navigator.geolocation.getCurrentPosition(
      position => {
        // call `setState` to update the state!
        this.setState({ lat: position.coords.latitude })
        // => re`render`s
      },
      err => console.log(err)
    )
  }

  render() {
    return <div>Latitude: {this.state.lat}</div>
  }
}
```

### Lifecycle
1. JS file loaded by browser
2. App component gets created
3. App returns JSX, renders HTML DOM

#### Nesting (component hierarchy)
* a component can be shown inside of another - `<MyComponent />`
#### Reusablity
* easily reusable componenet
#### Configuration
* configure componenet when it's created

### JSX
> special form of JS: HTML elements + other componenets\
1. create a normal HTML element
  * `div` `span` `h1` `table` ...
2. show another component
  * `Field` `Translate` `Languages`
```javascript
<div> // DOM element found => show `div` on the screen
  <Field /> // component found => call the component function => inspect the outcome JSX
  ...
```

### React vs ReactDOM library
* React (the *reconciler*) - work with components
* ReactDOM (the *renderer*) - discrete what to show and render HTML DOM elements


## State
* usable with `class` components or `function` components with `hooks`
* JS object that contains data relevant to a component
* updating the state causes the component to instantly rerender

### useState
* the *state* system
* keep track of (stores) the dynamic data
* used to update the HTML
```javascript
import { useState } from "react";
...
const [language, setLanguage] = useState("ru");
const [text, setText] = useState("");
```