# Just Express

> [Udemy](https://www.udemy.com/course/just-express-with-a-bunch-of-node-and-http-in-detail/)

## Network

### Network Packet (OSI Layer)

- Software Layers - HTTP, FTP, SSH
  - **Application** Layer
  - **Presentation** Layer
  - **Session** Layer
- **Transport** Layer - UDP/TCP
- Hardware Layers

  - **Network** Layer (Internet) - IP
  - **Data Link** Layer - WiFi, Ethernet
  - **Physical** Layer - cables

- TCP/IP (Internet) - Transport + Network Layer

### Transport Layer

> (Network Layer)Port[2<sup>16</sup>] &rarr; Segment[content]

#### UDP

- lightweight & fast (8 bytes header)
  - video gaming, streaming, live communication
- connectionless
- consistency (unreliable)
  - send data no matter what
  - doesn't care about the packet loss & order

#### TCP

- connection-based (three-way handshake)
  - (1)I want to connect &rarr; (2)yes or no &rarr; (3)data transfer
  - HTTP (need all the overhead)
- reliable
  - delivery ack, retransmission, in-order packets
  - congestion-control (latency)

### Application Layer

#### HTTP

- only connected when necessary
  - the machines will disconnect from each other when data transfer is over
  - when the responder is ready, the connection will be re-established
- stateless
  - no dialogue; everything is terminated as soon as the connection closes
    - the TCP is still open, not the HTTP connection
  - need to send all the header information whenever there's a connection

```
start line (single(res, req) line, status 'get /blog http/1.1', 'http/1.1 500')
header (meta-data, key/value, specifies the reuqest or describes the body)

body (content)
```

```bash
GET / http/1.1                  # start line
content-type: text/html         # headers
Cache-control: public
max-age: 0
...

THIS IS BODY
```

## Node.js Only

```javascript
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // routing
    res.writeHead(200, { 'content-type': 'text/html' }); // header, MIME-type
    // res.write('<h1>Hello World!</h1>');
    res.write(fs.readFileSync('index.html')); // body
    res.end(); // end connection
  }
});
server.listen(3000); // listen to port
```

---

# Express.js

## Basics

```javascript
// @express.js
exports = module.exports = createApplication;
```

```javascript
const express = require('express');
const app = express(); // invokes `createApplication` function
const port = 3000;

// any method
app.all('*', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

### Rest Verbs

```javascript
app.get((res, req) => {})
app.put((res, req) => {})
app.post((res, req) => {})
app.delete((res, req) => {})
app.use((res, req) => {}) // superset
...
```

### set

```javascript
app.set(name, value); // assign value to the internal set-table name
```

## Features

- **req**&**res** consist of TCP/IP + HTTP (network)
- **next** is all the things in between network stuff

### request

> `GET /blog http/1.1`\

- `req.locals`
  - an object that contains response local variablse _scoped to the request_
  - only available to the _view_ rendered during that request
  - useful for exposing request-level information such as the request path name, authenticated user, settings, etc.
- `req,ip`, `req.path`, `req.headers`, `req.body`

### response

- `res.send` => `Content-Type`(MIME-type): `text/HTML`
- `res.json` => `Content-Type`(MIME-type): `application/json` (also `res.jsonp`)
  - converts non-objects + json object
- `res.end` => `Content-Type`(MIME-type): `text/HTML`; close the connection
- `res.sendFile` - send file
- `res.locals` - available through the `res` (similar to `req.locals`); the view engine has access to it
- `res.render` - create content with HTML/CSS/JS; server-side rendering
- `res.redirect`
- `res.cookie`, `res.clearCookie`
- `res.query` - use the _query string_ (passing aroung insecure data)
- `res.params` - use the wildcard(`:`) routing parameters

### next

- calls the next middleware in stack
- work in between request and response
- hand control off to the next piece of middleware in the cycle
- without calling `next`, the middleware cycle will be terminated and that process will end

```javascript
// validateUser middleware
function validateUser(req, res, next) {
  // do something
  next(); // next piece of middleware will be used
}
app.use(validateUser); // tells express to use validateUser middleware at application level

app
  .get
  // do something
  // since there is no `next` to call, the process will be terminated
  ();
```

```javascript
// selective use of the middleware
app.use('/admin', validateUser);
app.get('/', (req, res) => {
  // validateUser not called
});
app.get('/admin', (req, res) => {
  // validateUser called
});
```

```javascript
// simpler way
// since `app.use` is the superset of `app.get`
app.use('/admin', validateUser); // solves it all
app.get('/admin', validateUser); // calls the middleware the GET methods

// can pass multiple middlewares
app.use('/multiple', middleware1, middleware2);
```

## Middleware

- any function that has access to the `req`, `res`, `next` objects

### json

- `req.body` object is created from `json` or `urlencoded`
- parses incoming requests with JSON payloads using `body-parser` module

```javascript
app.use(express.json(/* properties */));
```

### urlencoded

- `req.body` object is created from `json` or `urlencoded`
- parses incoming requests payloads based on `body-parser`
- parse `'content-type': 'application/x-www-form-urlencoded'`

```javascript
app.use(express.urlencoded());
```

### static

- serve static files without routing

```javascript
app.use(express.static(/* directory name; usually 'public' */));
```

## Helmet

> security middleware\

```javascript
const helmet = require('helmet');
// express stuff
app.use(heltmet());
```

```javascript
// a few useful middlewares
app.use(helmet.noCache());
app.use(helmet.xssFilter());
app.use(helmet.frameguard());

// alternative way
app.use(
  helmet({
    frameguard: false,
  })
);
```

## CSR

- continuosly update the _DOM_ with _json_ data with _AJAX_
- fast UI/UX

## SSR

> `ejs` example\

- create content with HTML/CSS/JS
- handle session variables, cookies easily

```javascript
app.set('view engine', 'ejs') // set template view engine
app.set('views', path.join(__dirname, 'views')) // set views directory
app.get('/', (req, res, next) => {
  res.render('index') // SSR of `views/index.ejs`
})

app.get('/', (req, res, next) =. {
  // data object `{}` is appended to `res.locals`
  res.render('index', {
    // content
    msg1: 'asdf',
    msg2: 'qwer',
    html: '<p>asdf</p>
  })
  // @template view, the `locals` object is passed by default
})
```

- use `locals` to set global variables

```javascript
const globalVariable = 123;
app.use((req, res, next) => {
  res.locals.globalVariable = globalVariable;
  next();
});
```

- the view engine has access to `res.locals`

```ejs
<%= msg1 %>
<!-- is the same as -->
<%= locals.msg1 %>

<!-- since html format is not considered safe (XSS prevent) it will not be evalutated -->
<%= html %>
<!-- instead, you should do this to print out unsafe values-->
<%- html %>
```

- to include templates into a template

```ejs
<!-- assume there is `head.ejs` and `footer.ejs` template files to recycle -->
<%- include('head') %>
<%- include('footer') %>

<!-- depracated version -->
<% include head %>
<% include footer %>

<!-- actual body here -->
<% parsedData.forEach(data => { %>
  <%= data %>
<% }) %>
```

### Cookie

> cookieParser\

- vs. `localStorage`
  - file size (`localStorage` being larger)
  - `localStorage` treats client data, while `cookie` handles server data

```javascript
const cookieParser = require('cookie-parser')
app.use(cookieParser()) // cookieParser middleware

app.post('/login', (req, res, next) => {
  // req.body is made by urlencoded, which parses the http message for sent data
  res.json(req.body)

  if (req.body.password) === 'x') {
    // set cookie
    res.cookie('username', username) // name of the cookie, value to set it to

    res.redirect('/welcome') // redirection
  } else {
    res.redirect('/login?msg=fail') // query string key=value
    // access with `res.query`
  }
})

app.get('/welcome', (req, res, next) => {
  res.render('welcome', {
    username: req.cookies.username // `cookies` object from cookieParser module
  })
})

app.get('/logout', (req, res, next) => {
  res.clearCookie('username') // remove cookie
  res.redirect('/login')
})
```

### Query String

```javascript
// url/temp?msg=fail
app.use((req, res, next) => {
  if (req.query.msg === 'fail') {
    res.locals.msg =
      'Sorry, this username and password combination does not exist';
  } else {
    res.locals.msg = '';
  }
  next();
});
```

### Wildcards

- wirdcard router url parameter stored in `req.params`

```javascript
// `:` routing url parameter
app.get('/story/:storyId', (req, res, next) => {
  res.send(`<h1>${req.params.storyId}</h1>`);
  // no next to end it here
});
```

- match a url parameter

```javascript
// receives the value of the parameter itself as the callback argument
// `id` in this example
app.param('id', (req, res, next, id) => {
  // do something
  next(); // to do something next
});
```

### Files

- `sendFile`

```javascript
res.sendFile(path.join(dirname, 'directory/file'), 'file name', (err) => {});
```

- `download`

```javascript
res.download(path.join(dirname, 'directory/file'), 'file name', (err) => {
  if (err) {
    // passes the boolean on the err parameter
    if (!res.headerSent) {
      // an example to treat an header set error
      res.redirect('/download/error');
    }
  }
});
// changes the header to `Content-Disposition`: attchment; filename="yo.png"
// then, actually uses `sendFile`
// - the browser sees the header and suppose not to render the file but download it
```

## Headers

```javascript
// error example
app.get('/example', (req, res, next) => {
  res.json({ msg: 'test' });
  res.send('blah');
  // able to send but an header error occurs on the server side,
  // since both `json` and `send` sets the header. So, the header's been set twice
});
```

```javascript
// example on properly setting the header
res.download(path.join(dirname, 'directory/file'), 'file name', (err) => {
  if (err) {
    // passes the boolean on the err parameter
    if (!res.headerSent) {
      // an example to treat an header set error
      res.redirect('/download/error');
    }
  }
});
```

```javascript
// manually setting the header
res.attachment(path.join(dirname, 'directory/file'), ...)
res.set('Content-Disposition', 'attachment')
```

## Router

- a way to set up a microservice-like routings
- all the methods (`all`, `post`, `delete`, `get`, `use`) and middleware works the same way

```javascript
// @router.js
const router = require('./admin');
app.use('/admin', router);

// @admin.js (router page)
let router = express.Router(); // creates a new router object

// '/' directs to `/admin'
// since the top app.use gets '/admin', then the router gets '/'
router.get('/', (req, res, next) => {
  res.json({ msg: 'Admin Page' });
});

module.exports = router;
```

## Real Examples

#### Locals

```javascript
router.use((req, res, next) => {
  // using `locals` for global values
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
```

#### Wildcard

```javascript
router.get('/movie/:id', (req, res, next) => {
  // res.json(req.params.id) // `params` stores the wildcard parameter
  const movieId = req.params.id;
  // require('request')
  request.get(/* some url using movieId */, (err, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render('renderedCustomPage', {
      parsedData // object shortened notation
    })
  });
});
```

#### req.body

```html
<form action="/search" method="post">
  <select name="cat">
    // sends `req.body.cat`
    <option value="movie">Movie</option>
    <option value="person">Actor</option>
  </select>
  <input type="text" name="movieSearch" /> // sends `req.body.movieSearch`
  <input type="submit" />
</form>
```

```javascript
router.post('/search', (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch); // sanitize the URI
  const cat = req.body.cat; // receive body variables
});
```

#### Authentication

```javascript
// use middleware function to filter out unauthorized connections
app.use((req, res, next) => {
  if (req.query.api_key != 123456789) {
    res.status(401); // Unauthorized = 401
    res.json('Invalid API Key');
  } else {
    next();
  }
});
```

#### Multer

> npm install --save multer

- middleware for handling `multipart/form-data` (uploading files)
- written on top of `busboy`

- form(_post_ method) `enctype="multipart/form-data"`

```html
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
```

- type attribute set to 'file'
