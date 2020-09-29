# HTTP Headers

```bash
# HTTP message
start line
headers

body
```

## Express.js Example

- every time you send a response, you are sending an **HTTP message**

```javascript
res.json;
res.send;
res.sendFile;
res.download;
res.redirect;
// you are not sending a webpage || json || file, etc.
// instead, you are sending an HTTP message
```

### Response Headers

- `res.set('Cache-Control', 'no-store')`
  - cached check: `req.fresh` & s`req.stale`
- `res.set('Content-Type', 'text/html')`
  - `text/plain`, `res.type`
- `res.append`
- `res.format`
- `res.links`
- `res.location`
- `res.status`, `res.sendStatus`

### Request Headers

- `req.get('Cache-Control)`
- `req.ip`
- `req.xhr`
- `req.accepts(['html', 'json'])`
  - `req.accepts('html')`
  - `Accpet: */*` - accept all types
  - `req.acceptsCharsets`, `req.acceptsEncodings`, `req.acceptsLanguage`
- `req.range`
