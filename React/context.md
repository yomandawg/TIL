# Context System

> _React v16.3.0_

- communicate from parent component to any nested arbitrary component
- not to replace _redux_; only to make ease of communicating information
- uses reference identity to determine when to re-render

### Basic Usage

```js
const MyContext = React.createContext({
  state1: [],
  state2: {},
});

function ProviderComponent({ children }) {
  return <MyContext.Provider>{children}</MyContext.Provider>;
}

function AppComponent() {
  return (
    <ProviderComponent /* provides `MyContext` to its children */>
      <MyContext.Consumer /* accesses the context via props */>
        {({ state1, state2 }) => {
          // do something with the state
        }}
      </MyContext.Consumer>
    </ProviderComponent>
  );
}
```

### vs. Props System

- passing down `props` exists in a hierarchy

```javascript
class Parent extends Component {
  render() {
    return (
      <div>
        <Child myProp={'my property'} />
      </div>
    );
  }
}
const Child = (props) => <div>{props.myProp}</div>;
```

## Information IO

| **Source of Data** (Input) | `default value`, `Provider`                     |
| -------------------------- | ----------------------------------------------- |
|                            | <center>&darr;**Context Object**&darr;</center> |
| **Nested Child** (Output)  | `this.context`, `Consumer`                      |

#### `default value` &rarr; `this.context`

```javascript
// @LanguageContext.js
export default React.createContext(/* default value */);
```

```javascript
class Button extends React.Component {
  // link to context object to use `this.context`
  static contextType /* derived special name */ = LanguageContext;

  render() {
    console.log(this.context); // default value
  }
}
// `Button.contextType = something` // alternative way to hook up contextType
```

#### `Provider` component (from `Context` object)

> top to bottom\

```javascript
class App extends React.Component {
  state = { language: 'english ' };

  render() {
    return (
      <div>
        <LanguageContext.Provider value={this.state.language}>
          {' '}
          // value connects to default value inside LanguageContext
          <Component />
        </LanguageContext.Provider>
      </div>
    );
  }
}
```

#### `Consumer` component (from `Context` object)

> bottom to top\

- `Consumer` child function input is pointing to the `value`

```javascript
class Button extends React.Component {
  render() {
    return (
      <button className="ui button primary">
        <LanguageContext.Consumer>
          {(value) => (value === 'english' ? 'Submit' : 'Voorleggen')} //
          provide function to automatically invoke on rendering (input pointing
          the `value`)
        </LanguageContext.Consumer>
      </button>
    );
  }
}
```

- handling multiple `Consumers` (multiple context values)

```javascript
class Button extends React.Component {
  renderSubmit = (value) => (value === 'english' ? 'Submit' : 'Voorleggen');

  render() {
    return (
      <ColorContext.Consumer>
        {(color) => (
          <button className={`ui button ${color}`}>
            <LanguageContext.Consumer>
              {this.renderSubmit}
            </LanguageContext.Consumer>
          </button>
        )}
      </ColorContext.Consumer>
    );
  }
}
```

### Separating the business logic

- implementing a `store` with `Context`

```javascript
const Context = React.createContext('english');

export class LanguageStore extends React.Component {
  state = { language: 'english' };

  // business logic
  onLanguageChange = language => {
    this.setState({ language });
  };

  render() {
    return (
      // pass down the store + callbacks with `Provider`
      <Context.Provider value={{ ...this.state, onLanguageChange /* remember to create a new object */ }}>
        {this.props.children} // the components inside the `<LanguageStore>` will be shown here
      </Context.Provider>
    );
  }
}

export default Context;
```

```javascript
import LanguageContext from '../contexts/LanguageContext';

class LanguageSelector extends React.Component {
  static contextType = LanguageContext; // hooking up the context with `value`

  render() {
    return (
      <div>
        <i onClick={() => this.context.onLanguageChange('english')} /> // the
        callback function is accesible through `context`
      </div>
    );
  }
}
```
