# react-router
```javascript
// code-behind
const Route = ({ path, children }) => {
  return window.location.pathname === path
    ? children
    : null;
};

// JSX
return (
  <div>
    <Route path="/list">
      <List props={props}>
    </Route>
  </div>
);
```

### Link
> prevent page reloading from the requests\
* Link &rarr; Navigation Event &rarr; Route &rarr; detect the change and update URL
* prevent refreshing with `window.history.pushState({}, '', '/list')`
```javascript
const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return; // ctrl-key opens in a new tab
    }

    event.preventDefault(); // prevent reloading
    window.history.pushState({}, '', href); // update URL
    
    // communicate the changes
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};
```

## react-router-dom
> `npm install --save react-router-dom`\
> navigtaion for dom-based browser web apps\
```javascript
const Index = () => {
  return <div>Index Page</div>;
};

const Main = () => {
  return <div>Main Page</div>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch> // only show 1 potential route
            <Route path="/" exact={true} component={Index} /> // exact calls the Route only when the path is exact match
            <Route path="/main" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};
```

### Route `props`
* `location`
* `match` - information about the URL


### Link
> prevent the page from reloading\
* creates an un-reloading anchor tag
* `BrowserRouter`(history object) receives the changed url and keeps the *history*\
<=> traditional anchor tags (`<a href="/route">`) make a brand new request - not suitable for SPA
  - all related HTML/CSS/JS data including the react `bundle.js` will be dumped

#### React-App Dev Server
* **`<BrowserRouter>`**
  - routing to `/page` example
  1. search dev resources
  2. search public directory
  3. return `index.html` <=> unlinke traditional server (which returns `404 page not found`)
  - `index.html` and `bundle.js` loads => `<BrowserRouter>` => history object => search for proper route => renders the `<Route>` => if the route is undefined, default:`index.html`
  - browser router needs to set up the application to default load to `index.html`
* **`<HashRouter>`**
  - used to tell the server not to look up the url after `#`
  - `.../#/route` - the `route` will meant to be used by the client/browser react side (not the backend)
  - show `<Route>` or `index.html` content
* **`<MemoryRouter>`** - no router shown on url


## Programic navigation
`history` &rarr; `BrowserRouter` &rarr; `<Route path="/mypath">` &rarr; `myPath_Component`\

### navigation from `component`
* `history` keeps track of the address bar in the browser
* `BrowserRouter` listens to `history` for URL changes
  - passes down the `history` object as the `prop` down to the `component` &rarr; triggers a navigation
* a specific `Route` is visible only when the `path` matches the URL

### navigation from `Action Creator`
* `history` has the ability to *change* the address bar as well
  - make use of the `history` object!
* `component` passes down the `history` object from `prop`  to `Action Creator`
* handling `history` object (a react-router object) is difficult
```javascript
<BrowserRouter /> // @component/App.js

// anti-pattern, since `actionCreator` is called with the `history` object every single time
export const actionCreator = history => {
  // do something
  dispatch({ type: 'CUSTOM_ACTION', payload: response.data })
}
```
* instead, create a new controllable custom `history` object\
`myHistory`&rarr;`PlainRouter`&rarr;`Route`&rarr;`Component`\
```javascript
import { createBrowserHistory } from 'history'; // from react-router-dom
<Router history={createBrowserHistory()} /> // @component/App.js

export const createStream = formValues => async (dispatch, getState) => {
  // do something
  dispatch({ type: 'CUSTOM_ACTION', payload: response.data });

  // Do programmic navigation to get the user back to the root route
  history.push('/');
};
```