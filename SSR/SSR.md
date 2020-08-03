# Server Side Rendering

* traditional React application - rendered only on the browser
  - Browser requests page &rarr; Browser requests JS file &rarr; React app boots, requests json from backend &rarr; Content visible

* condensing loading process is critical for user experience 

* **SSR advantage**
  - Browser requests page &rarr; (rendered page from the server) &rarr; Content visible
  - isomorphic app - exact same code executed on the server and the client
    * better user experience
    * faster overall loading time (although, initial page rendering is slower)
    * predictable SEO and site indexing


## SSR Process

| Browser | | Server |
| :-: | :-: | :-: |
| request content | &rarr; | receive request |
| | | &darr; |
| receive `<HTML>` | &larr; | generate React app and send `<HTML>` |
| &darr; | | |
| request required `bundle.js` | &rarr; | receive request |
| | | &darr; |
| React app boots up with `bundle.js` | &larr; | send `bundle.js` |
| &darr; | | |
| request followup data | &rarr; | receive request |
| | | &darr; |
| App renders on screen | &larr; | send `json` data |


## Server Architecture
> API Server's' &rarr; Rendering Server's' &rarr; Browser

* two-tier (N&rarr;M&rarr;Browser) architectiure to scale out easily

| API Server | Renderer Server |
| :-: | :-: |
| *Business Logic and Data Layer* | *View Layer* |
| DB Access | Fetch Data |
| Validation | Produce HTML |
| Authentication | |
| Authorization | |
| Logging | |


### JSX on Server
* run *JSX* on backend
  - Components (*JSX*) &rarr; `index.js` &rarr; `renderToString`(raw HTML) &rarr; Webpack & Babel &rarr; `bundle.js` (run node with this)

* server codes
```javascript
// root file (express server)
const renderToString = require('react-dom/server').renderToString; // turn components to raw HTML

app.get('/', (req, res) => {
  const content = renderToString(
    <Home /> // JSX on server
  );

  res.send(content);
});
```
* webpack settings
```javascript
// webpack.server.js
module.exports = {
  // build a bundle for nodeJS
  target: 'node',

  // root file for the server application
  entry: './src/index.js',

  // output file generation
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // run babel
  module: {
    rules: [
      {
        test: /\.js?$/, // regEx: apply for .js files
        loader: 'babel-loader',
        exclude: /node_modules/, // not run babel for certain directories
        options: {
          presets: [
            'react', // JSX
            'stage-0', // handling async codes
            ['env', { targets: { browsers: ['last 2 versions'] }}] // meet the requirements of the last 2 versions of the popular browsers
          ]
        }
      }
    ]
  }
};
```
* npm settings (with auto-build watch)
```json
// package.json
"scripts": {
  // watch for `npm build` then execcute `node build/bundle.js`
  "dev:server": "nodemon --watch build --exec node build/bundle.js",
  // watch for changes
  "dev:build:server": "webpack --config webpack.server.js --watch"
},
```


## Terminology

### Server Side Templating
> pre-rendered dynamic templates with engines such as `mustache.js`

### Universal (Isomorphic) Javascript
> same code runs on the server and the browser

* node.js doesn't support recent ES versions &rarr; webpack & babel to bundle the server code
  - front and back shares similar Javascript dialect and style



## Client Side JS

* Normal React Application
  - React + Component &rarr; render components to DOM &rarr; set up event handlers
* SSR
  - Server sends raw HTML &rarr; where is JS?

* webpack bundle architecture

| Bundle 1 | Bundle 2 |
| :-: | :-: |
| *run on backend* | *to browser* |
| Server Code | React App |
| React App | |

* client side bundle config
```javascript
// webpack.client.js
const path = require('path');

module.exports = {
  // root file for the browser side
  entry: './src/client/client.js',

  // output file generation
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  // run babel
  module: {
    rules: [
      {
        test: /\.js?$/, // regEx: apply for .js files
        loader: 'babel-loader',
        exclude: /node_modules/, // not run babel for certain directories
        options: {
          presets: [
            'react', // JSX
            'stage-0', // handling async codes
            ['env', { targets: { browsers: ['last 2 versions'] }}] // meet the requirements of the last 2 versions of the popular browsers
          ]
        }
      }
    ]
  }
};
```

* enable public(static) codes to be accessible from outside
```javascript
// index.js (express server)
app.use(express.static('public')); // treat `public/` directory to be available
```
```javascript
// HTML snippet; "bundle.js" from static `public/` directory
const html = `
  <html>
    <head></head>
    <body>
      <div>${content}<div>
      <script src="bundle.js"></script>
    </body>
  </html>
`;

res.send(html);
```

### Hydration

| Second (`Client.js`) bundle lifecycle |
| :-: |
| App rendered on the server into some div in the 'template' |
| Rendered app is sent to the user's browser |
| Browser renders HTML file on the screen, loads client bundle |
| Client bundle (`Client.js`) boots up |
| Re-render the entire React app for the second time into the 'save' div |
| React renders our app on the client side, then compares the new HTML to what already exists in the document |
| React takes over the existing rendered app, binds event handlers, etc |

* server (`index.js`) &rarr; initial render (provide the 'skeleton' HTML)
* client (`client.js`) &rarr; binds event and handlers (**hydration**)

```javascript
ReactDOM.hydrate( // ReactDOM.render for hydration will be depracated
  <Component />,
  document.querySelector('#root')
);
```


## Server Side JS

* webpack process
  - webpack sees `imports` &rarr; bundles all the implemented modules
* not required to bundle all the modules, since unlike the browser, *node* require modules on runtime

* `webpack-node-externals`
```javascript
// webpack.server.js
// do not bundle libraries into the bundle
externals: [webpackNodeExternals()]
```


## Server Side Routing
* Request (`/`, `/users`, `/any`) &rarr; Express Route Handler &rarr; React Router

* normal browser side react router

| browser requests `/users` |
| :-: |
| express handler `app.get('*')` responds |
| sends `index.html` |
| sends `bundle.js` |
| React boots up, React Router boots up |
| `BrowserRouter` looks at URL, renders some route(component) |

* can't use `BrowserRouter` on server side; no direct access to the URL (address bar)
* *solution*: separate the server & client router

| Server | | Client |
| :-: | :-: | :-: |
| **`StaticRouter`** | |
| &darr; | |
| initial SSR of the app | &rarr; | `hydrate` |
| | | &darr; |
| | | **`BrowserRouter`** |

* need to share the same React DOM format
```javascript
// client.js
ReactDOM.hydrate(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
  ,
  document.querySelector('#root')
);
```
* while `BrowserRouter` can watch the address bar, `StaticRouter` needs to be provided with a specific URL
  - the original URL is contained in the `request` object
```javascript
// index.js (express)
app.get('*', (req, res) => {
  res.send(renderer(req));
});
```
```javascript
// renderer.js (SSR helper)
export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path /* true requested URL */} context={{}}>
      <Routes />
    </StaticRouter>
  );

  // HTML snippet; "bundle.js" from static `public/` directory
  return `
    <html>
      <head></head>
      <body>
        <div id="root">${content}<div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
```

---

## SSR with Redux

### Store differences between browser & server
* create two different stores
* **Server** - not to closely attach it to the `Provider` for handling carefully then pass it to render
```javascript
// index.js (express server)
app.get('*', (req, res) => {
  const store = createStore();

  // logic to initialize and load data into the store

  res.send(renderer(req, store));
});
```
```javascript
// renderer.js
export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <Routes />
      </StaticRouter>
    </Provider>
  );
  
  return template;
};
```
* to use `async/await` ontop of babel
```javascript
import 'babel-polyfill'; // helper functions from babel to use async/await, etc.
```

### Detecting data load and action creators
* need to know the exact instant of the request issued from action creators are completed

* traditional react-redux app

| React | | Redux |
| :-: | :-: | :-: |
| `Root` Component | | |
| &darr; | | |
| `UserList` | `ComponentDidMount`<br/>&rarr; | `fetchUsers` Action Creator |
| | | &darr; |
| `UserList` | list of `Users`<br/>&larr; | `users` Reducer |

* no time to detect data loads (`componentDidMount`) from the back, then send it to browser
* changes the server side data load flow to...

| SSR Flow | |
| :-: | :-: |
| App rendered | &rarr; **Response sent back to browser** |
| `UserList` `componentDidMount` | |
| `fetchUsers` | |
| API request | |
| ... | |

* SSR HTML is sent back to the browser before any data fetching is completed

* **Solution**
1. render the application two times
  * *PROS*: easy to apply
  * *CONS*: waste of network resource & only loads one round
2. attach data-loading functions
  - figure out what components need to be rendered (based on URL)
  - call `loadData` attached to thos components
  - detect that requests are complete
  - render the app
  - send result to browser
  * *PROS*: renders once and clearer
  * *CONS*: extra codes

* `connect` function works with `Provider`
  - since we need to work with the `store` before rendering &rarr; manually handle `store`(manually call `store.dispatch`) without `connect`
* `react-router-config`
  - so we can direct what components to be rendered based on URL
```javascript
// Routes.js

// export default () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route path="/users" component={UsersList} />
//     </div>
//   )
// };

// so we can direct what components to be rendered based on URL
export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    loadData // figure out what components need to be rendered (arbitrary)
    path: '/users',
    component: UsersList
  }
];
```
```javascript
// replace
<Routes /> => <div>{renderRoutes(Routes)}</div>
```
```javascript
// index.js (express server)
app.get('*', (req, res) => {
  // match the requested URL
  // returns the `loadData` and `match`
  // match the requested URL
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null; // return an Array of promises - collect all the loadData functions
  });

  // when all promises are resolved
  Promise.all(promises).then(() => {
    res.send(render(req, store));
  });
})
```

| Component File | Routes File | Server `index.js` |
| :-: | :-: | :-: |
| `Component`<br/>`loadData` | match path and component to show | run each component's `loadData` |

| Server `index.js` | | `loadData` |
| :-: | :-: | :-: |
| call `loadData`, passing in the redux store | &rarr; | dispatch action creator |
| | | &darr; |
| resolve(Promise) then render | &larr; | return a promise |


### Client Side Rehydration

* how to preserve the server `reduxState` to shown on the client?

| State Process | |
| :-: | :-: |
| Server Redux fetches data | `reduxState = { users: [{name:'bill'}, ...] }` |
| Page rendered on server | |
| <span style="color:green">Store dumps its state into the HTML template</span> | `json` data |
| Page HTML sent to browser | |
| Client `bundle.js` sent to browser | |
| Bundle creates its client side redux store | |
| <span style="color:green">Client store initialized with state that was dumped in page</span> | |
| Page rendered with store from client side redux | `reduxState = { users: [] }` |

```javascript
// renderer.js
return `
  <html>
    <head></head>
    <body>
      <div id="root">${content}<div>
      <script>
        window.INITIAL_STATE = ${JSON.stringify(store.getState())}
      </script>
      <script src="bundle.js"></script>
    </body>
  </html>
`;
```

* initial hydrating will use exact same state (`store.getState()`) from the server


#### Prevent XSS
* `serialize-javascript`
  - takes a string and escape malicious characters
```javascript
import serialize from 'serialize-javascript';

JSON.stringify(testCode);
serialize(testCode); // done!
```


#### Authentication needs to be handled on server
* cookie based authentication problem - server does not have easy access to the cookie

* browser trying to access the `api server` creates cookies of the `api server`
* browser trying to access the `render server` __does not share__ cookies of the `api server`
  - no way for the `render server` to get cookies related to the `api server`
  - how to share the `api server` cookies with the `render server`?

| | | Sharing Proxy | | |
| :-: | :-: | :-: | :-: | :-: |
| Browser | (Oauth Process)&rarr; | Render Server | (Oauth'ed)&rarr; | API Server |
| Browser | &larr;(cookie with unique code) | Render Server | &larr;(cookie with unique code) | API Server |

* user request to `proxy` running on the `render server` 
* &rarr; proxy forwards the request for authentication onto the `api server`
* &rarr; cookie is issued by the `api server`
* &rarr; `proxy` will communicate the cookie back to the browser

* browser will think that it's communicating with the `render server`.
* The `proxy` is invisibly sharing requests with the `api server`; the browser will believe that the cookie is being issued by the `render server`

* cookies instead of **JWT** reality
  * no request body with `GET` request
  * no rendered content as a response to the initial request
  * the only thing that's attached to the request is *cookies*!

| Browser | | Renderer |
| :-: | :-: |:-: |
| | `request('/')`&rarr; | |
| | &larr;`jwt`? | |
| | `jwt`&rarr; | |
| | &larr;`content` | |

* cannot attach specific information with a `GET` request - `jwt` cannot be controlled within the first request
  - alternative solution: *cookies can be attached to a request*!

* `express-http-proxy`
```javascript
// index.js
import proxy from 'express-http-proxy';
app.use('/api', proxy('http://react-ssr-api.herokuapp.com'));
```

* **initial page load phase**
  - `request` with attached `cookie` is made to the `render server`
  - `render server` makes use of the `proxy`(`fetchFunction`&rarr;`Action Creator`&rarr;`axios` request to the `api server`)
  - take the `cookie` off of the initial browser request and attach it to the `axios` request (tricking the api server to think that the request is directly being made)

* **followup request phase**
  - after the initial request, SSR(isomorphic) will enable browser to make the exact same request as the server (same javascript code)
  - `fetchFunction`&rarr;`Action Creator`&rarr;`axios` request with attached `cookie` to the `render server` (`axios` behaves slightly differently with attached `cookies`)
  - `render server` doesn't need to attach `cookies` manually anymore, use `proxy` right away to send request to `api server`

```javascript
// sudo-code
if (NOT_RUNNING_ON_SERVER) {
  const res = await axios.get('render_server/users') // browser request
} else {
  const res = await axios.get('/api/users', { cookie }); // server request
}
```

* how to notice that the request is from the server or the client?

* custom `axios` configuration
  * one for client and one for server
```javascript
// set options for axios
var instance = axios.create({
  baseURL: 'http://some-domain.com/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

* `redux-thunk` configuration
```javascript
function createThunkMiddleware(extraArgument);

const thunk = createThunkMiddleware();
// allows customization of the third hidden extraArgument
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

* create custom `axios` &rarr; pass to `redux-thunk` &rarr; custom `axios` availbale in `action creator`
  * attach all that cookies and server vs. client stuff inside the customization!

* client side
```javascript
// client.js
const axiosInstance = axios.create({
  baseURL: '/api' // default request to /api/something
});

const store = createStore(
  reducers,
  window.INITIAL_STATE, // initial state
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);
```
```javascript
// actions/index.js
export const fetchUsers = () => async (dispatch, getState, api/*axiosInstance*/) => {
  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users')
  const res = await api.get('/users'); // custom `axiosInstance`

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
};
```

* server side
```javascript
// index.js
app.get('*', (req, res) => {
  const store = createStore(req); // pass `req` to the store to make cookies accessible
  ...
```
```javascript
// creatStore.js
export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com' // full URL since it's from the server
    headers: { cookie: req.get('cookie') || '' /* disposing undefined */ } // pass cookies
  });

  const store = createStore(
    reducers,
    {}
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  )
  
  return store;
};
```


### global component (nested routes)
```javascript
// App.js
const App = ({ route }) => {
  return (
    <div>{renderRoutes(route.routes)}</div>
  );
};

export default {
  component: App,
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser()) // always running action
};
```
```javascript
// Router.js
export default [
  {
    ...App, // default component; no path since this component will always be displayed
    routes: [ // the below components are nested inside the App component
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...UsersListPage,
        path: '/users',
      }
    ]
  }
];
```

* tip
```javascript
<Link to="/route" /> // react app navigation
<a href="/route" /> // browser URL change
```


### NotFoundPage (404 Not Found)
* `context` prop allows communication between the rendered component and the render file
  - `context={{}}` (empty object) &rarr; `<StaticRouter>` prop `context` &rarr; `NotFoundPage` component receives `context` prop (fill in the `context` object with the error message) &rarr; after rendering, examine if `NotFoundPage` has filled `context` with the error message (catch if error)

* how to connect `context` with `response` from Express.js
```javascript
// renderer.js
export default (req, store, context/*the third argument*/) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}> // context prop
        <div>{renderRoutes(Routes)}<div> // custom routes
      </StaticRouter>
    </Provider>
  );

  return /* raw HTML here */
}
```
```javascript
// pages/NotFoundPage.js
const NotFoundPage = ({ staticContext = {} /*context*/ } /* default set to {} since this will not be available for the browser since client.js renders the component with `<BrowserRouter>` */) => {
  staticContext.notFound = true; // set notFound to true
  ...
};
```
```javascript
// index.js (express)
app.get('*', (req, res) => {
  ...
  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
})
```


### Prevent server from 'hanging' (401 Unauthorized)
```javascript
// index.js (express server)
app.get('*', (req, res) => {
  // match the requested URL
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null; // return an Array of promises - collect all the loadData function
  });

  // note that if one of the promise is not resolved, `then` will not be called
  Promise.all(promises).then(() => {
    ...
  });
});
```

1. handle with `catch` (not recommended)
  * bad approach since the server *knows* what went wrong - sending an irresponsible error message is a not good approach
```javascript
Promise.all(promises).then(() => {
  ...
}).catch(() => {
  res.send('Something went wrong'); // abandon the 'entire' SSR process and return an error
});
```

2. attempt to render the content (not recommened)
  * bad approach since the application is rendered too early (right after `rejected`) when other unresolved promise is being awaited
```javascript
Promise.all(promises)
  .then(render)
  .catch(render) // force render
```

3. circumvent the issue with `Promise.all` (recommended)
  * wrap the inner promises with the outer promise to give chance for all requests to be completed
```javascript
const promises = matchRoutes(Routes, req.path).map(({ route }) => {
  return route.loadData ? route.loadData(store) : null; // return an array of [promise || null]
}).map(promise => {
  if (promise) {
    return new Promise((resolve, reject) => {
      promise.then(resolve).catch(resolve); // always resolving promise
    });
  }
});

Promise.all(promises).then(() => {
  ...
})
```


## higher order component (HOCs)
* takes a component and returns a new component

* Authentication approach with HOCs
```javascript
// components/hocs/requireAuth.js
export default ChildComponent => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth) {
        case false:
          return <Redirect to="/" />;
        case null:
          <div>Loading...</div>;
        default:
          return <ChildComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(RequireAuth);
};
```
```javascript
// pages/AdminListPage.js
export default {
  component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsListPage)),
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};
```
* SSR `Redirect`
```javascript
// index.js (express server)
if (context.url) { // <Redirect> changes the `context.url`
  return res.redirect(301, context.url) // 301 Moved Permanently (URL redirection)
}
```