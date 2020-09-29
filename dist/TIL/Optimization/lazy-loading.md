# Lazy Loading

> on-demand-loading with code splitting

- only render what's currently visible on screen

## Webpack Code Splitting (Webpack)

- babel plugin for dynamic `import()`

```js
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

```js
function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash') // webpackChunkName needed for [name].bundle.js
    .then(({ default: _ }) => {
      const element = document.createElement('div');

      element.innerHTML = _.join(['Hello', 'webpack'], ' ');

      return element;
    })
    .catch((error) => 'Error occured while loading the component');
}
```

- with async-await

```js
async function getComponent() {
  const element = document.createElement('div');
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */ 'lodash'
  );

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
```

### React.lazy

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent')); // calls import() and returns Promise
const AnotherComponent = React.lazy(() => import('./AnotherComponent')); // calls import() and returns Promise

function MyComponent() {
  return (
    <div>
      <Suspense fallback=({<div>Loading...</div>})> // allows waiting for all the nested lazy component to load - Promise.all
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  )
}
```

- with React-Router

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch> // Switch treats each route to be fully rendered component -> fallback triggered every time there's a switch
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>;
);
```
