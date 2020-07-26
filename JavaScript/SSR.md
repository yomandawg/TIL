# Server Side Rendering

* traditional React application - rendered only on the browser
  - Browser requests page &rarr; Browser requests JS file &rarr; React app boots, requests json from backend &rarr; Content visible

* condensing loading process is critical for user experience 
* SSR advantage
  - Browser requests page &rarr; (rendered page from the server) &rarr; Content visible


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

#### Store differences between browser & server
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



#### Authentication needs to be handled on server
* cookie based authentication problem - server does not have easy access to the cookie

#### Detecting data load and action creators
* need to know the exact instant of the request issued from action creators are completed

#### Rehydration