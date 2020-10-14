# Cross Origin Resource Sharing

- both side needs to agree passing data to each other

- Request types
  - Simple Requests - can be made with `<form>` or `<script>`
    1. Simple method: GET, POST
    2. Simple headers: `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`
  - Non-simple Requests
    - _preflight_ requests that ask the server whether to accept such cross-origin requests

## Simple Requests

- cross-origin requests from the browser (local)
  - `Origin`(domain) header is added by the browser

```http
GET /request
Host: anywhere.com
Origin: http://localhost:5500
...
```

1. the server inspect the `Origin`
2. if it agrees to accept the request, adds the `Access-Control-Allow-Origin`(domain or \*) header to the response
3. otherwise, its an error response

```http
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: http://localhost:5500
```

- the browser is a trusted mediator
  - ensures that the correct `Origin` is sent with a cross-origin request
  - checks for `Access-Control-Allow-Origin` header in the response &rarr; JavaScript is allowed to access the response, otherwise error

## Response Headers

- simple response headers that JavaScript have access to
  - `Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modifed`, `Pragma`
- granting access to other response headers &rarr; `Access-Control-Expose-Headers`

```http
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Expose-Headers: Content-Length,API-Key
```

## Non-Simple Requests

- requests that aren't `GET/POST` &rarr; _preflight_(`OPTION`) request for asking permission to the server

* preflight `OPTION` request

```http
OPTION /request
host: anywhere.com
Access-Control-Request-Method: ${non-simple method}
Access-Control-Request-Headers: ${list of allowed headers}
Access-Control-Max-Age: ${optional, cache time to prevent preflights on every request}
```

- example of non-simple request

```js
fetch('http://site.com/service.json', {
  method: 'PATCH', // not GET/POST
  headers: {
    'Content-Type': 'application/json', // non-simple type
    'API-Key': 'secret', // non-simple header
  },
});
```

- preflight

```http
OPTIONS /service.json
Host: site.com
Origin: http://localhost:5500
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

- response to preflight

```http
200 OK
Access-Control-Allow-Origin: http://localhost:5500
Access-Control-Allow-Methods: PUT,PATCH,DELETE # the following actual request can use these methods
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control # the following actual request can use these headers
Access-Control-Max-Age: 86400 # permission is cached for the given time
```

> difference between<br>`Access-Control-Allow-Headers` - actual request can access these<br>`Access-Control-Expose-Headers` - browser (JavaScript) can access these

- actual request (when the preflight is successful)

```http
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: http://localhost:5500
```

- server response

```http
Access-Control-Allow-Origin: http://localhost:5500 # checked by the browser
... (response)
```

## Cross-Origin and Credentials

- same-origin request is accompaniced by the cookies, while cross-origin requests from JavaScript has none
  - `fetch('http://example.com')` does not send any cookies, even those that belong to the same domain (for security reasons)
- these are by design (security reason to not grant JavaScript sensitive information)

- to send credentials in `fetch`

```js
// send cookies originating from example.com domain
fetch('http://example.com', {
  credentials: 'include',
});
```

- if server allows `credentials` request

```http
200 OK
Access-Control-Allow-Origin: http://localhost:5500 # * not allowed for security reasons
Access-Control-Allow-Credentials: true
```
