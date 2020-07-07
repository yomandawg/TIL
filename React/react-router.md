# react-router

## react-router-dom
> `npm install --save react-router-dom`\
> navigtaion for dom-based browser web apps
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
          <Route path="/" exact={true} component={Index} /> // exact calls the Route only when the path is exact match
          <Route path="/main" component={Main} />
        </div>
      </BrowserRouter>
    </div>
  );
};
```

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