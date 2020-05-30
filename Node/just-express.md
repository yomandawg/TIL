# Just Express
> [Udemy](https://www.udemy.com/course/just-express-with-a-bunch-of-node-and-http-in-detail/)

## Network

### Network Packet (OSI Layer)
* Software Layers - HTTP, FTP, SSH
  * **Application** Layer
  * **Presentation** Layer
  * **Session** Layer
* **Transport** Layer - UDP/TCP
* Hardware Layers
  * **Network** Layer (Internet) - IP
  * **Data Link** Layer - WiFi, Ethernet
  * **Physical** Layer - cables

* TCP/IP (Internet) - Transport + Network Layer


### Transport Layer
> (Network Layer)Port[2<sup>16</sup>] &rarr; Segment[content]

#### UDP
* lightweight & fast (8 bytes header)
  * video gaming, streaming, live communication
* connectionless
* consistency (unreliable)
  * send data no matter what
  * doesn't care about the packet loss & order

#### TCP
* connection-based (three-way handshake)
  * (1)I want to connect &rarr; (2)yes or no &rarr; (3)data transfer
  * HTTP (need all the overhead)
* reliable
  * delivery ack, retransmission, in-order packets
  * congestion-control (latency)


### Application Layer

#### HTTP
* only connected when necessary
  * the machines will disconnect from each other when data transfer is over
  * when the responder is ready, the connection will be re-established
* stateless
  * no dialogue; everything is terminated as soon as the connection closes
    * the TCP is still open, not the HTTP connection
  * need to send all the header information whenever there's a connection
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
  if(req.url === '/') { // routing
    res.writeHead(200, {'content-type':'text/html'}); // header, MIME-type
    // res.write('<h1>Hello World!</h1>');
    res.write(fs.readFileSync('index.html')); // body
    res.end();  // end connection
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
})

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
app.set(name, value) // assign value to the internal set-table name
```


## Features
* **req**&**res** consist of TCP/IP + HTTP (network)
* **next** is all the things in between network stuff

### request
> `GET /blog http/1.1`\
* `req.locals`
  * an object that contains response local variablse *scoped to the request*
  * only available to the *view* rendered during that request
  * useful for exposing request-level information such as the request path name, authenticated user, settings, etc.
* `req,ip`, `req.path`, `req.headers`, `req.body`

### response
* `res.send` => `Content-Type`(MIME-type): `text/HTML`
* `res.json` => `Content-Type`(MIME-type): `application/json` (also `res.jsonp`)
  * converts non-objects + json object
* `res.end` => `Content-Type`(MIME-type): `text/HTML`; close the connection
* `res.sendFile` - send file
* `res.locals` - available through the `res` (similar to `req.locals`)
* `res.render` - create content with HTML/CSS/JS; server-side rendering

#### SSR
* create content with HTML/CSS/JS
* handle session variables, cookies easily
```javascript
app.set('view engine', 'ejs') // set template view engine
app.set('views', path.join(__dirname, 'views')) // set views directory
app.get('/', (req, res, next) => {
  res.render('index') // SSR of `views/index.ejs`
})
```

#### CSR
* continuosly update the *DOM* with *json* data with *AJAX*
* fast UI/UX


### next
* work in between request and response
* hand control off to the next piece of middleware in the cycle
* without calling `next`, the middleware cycle will be terminated and that process will end
```javascript
// validateUser middleware
function validateUser(req, res, next) {
  // do something
  next(); // next piece of middleware will be used
}
app.use(validateUser); // tells express to use validateUser middleware at application level

app.get(
  // do something
  // since there is no `next` to call, the process will be terminated
)
```
```javascript
// selective use of the middleware
app.use('/admin', validateUser)
app.get('/', (req, res) => {
  // validateUser not called
})
app.get('/admin', (req, res) => {
  // validateUser called
})
```
```javascript
// simpler way
// since `app.use` is the superset of `app.get`
app.use('/admin', validateUser) // solves it all
app.get('/admin', validateUser) // calls the middleware the GET methods
```

## Middleware
* any function that has access to the `req`, `res`, `next` objects

### json
* `req.body` object is created from `json` or `urlencoded`
* parses incoming requests with JSON payloads using `body-parser` module
```javascript
app.use(express.json(/* properties */))
```

### urlencoded
* `req.body` object is created from `json` or `urlencoded`
* parses incoming requests payloads based on `body-parser`
* parse `'content-type': 'application/x-www-form-urlencoded'`
```javascript
app.use(express.urlencoded({extended:false}))
```

### static
* serve static files without routing
```javascript
app.use(express.static(/* directory name */))
```


## Helmet
> security middleware\
```javascript
const helmet = require('helmet')
// express stuff
app.use(heltmet())
```
```javascript
// a few useful middlewares
app.use(helmet.noCache())
app.use(helmet.xssFilter())
app.use(helmet.frameguard())

// alternative way
app.use(helmet({
  frameguard: false
}))
```