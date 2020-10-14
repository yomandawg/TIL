# Json Web Tokens

- URL-safe means of securely representing claims to be transferred between two parties
  - server issues an encoded (with server-side secret key) JWT to the client &rarr; client request &rarr; send the JWT along with to the server &rarr; server _deserializes_ JWT to verify the signature and user
- `header`.`payload`.`signature` (Base64-URL encoded)
- used for authorization (verifying the user) &harr; not authentication (logging in)

- vs. cookies

  - jwt (client-stored) - not stored in the server (same session across multiple servers)
  - cookies - client request &rarr; send the session ID along with to the server &rarr; _server checks its memory_ to verify the user with session ID

- benefits

  - same session across multiple servers (client-stored server-deserialized)

- disavantages

  - force caching the token in the storage (vulnerable)
  - more bandwidth (bigger than cookie)

- **usage examples**
  - _single-time usage for short time duration_
  - one-time use token
  - password change token

---

## Node.js Implementation

```
npm i express jsonwebtoken dotenv
```

- vscode `.rest` extension

```rest
POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "yoman"
}
```

- `.env` - store environment variables

```js
const secretKey = require('crypto').randomBytes(64).toString('hex');
const refreshKey = require('crypto').randomBytes(64).toString('hex');
```

```env
ACCESS_TOKEN_SECRET="${secretKey}"
REFRESH_TOKEN_SECRET="${refreshKey}"
```

- server.js

```js
require('dotenv').config(); // enable imports from .env

app.use(express.json()); // use json parser middleware

// authentication
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(
    user /**payload */,
    process.env.ACCESS_TOKEN_SECRET /**secret key */
  );

  res.json({ accessToken: accessToken }); // $TOKEN
});
```

- authorizing (deserialize jwt) middleware

```js
function authorize(req, res, next) {
  const authHeader = req.headers['authorization']; // Bearer $TOKEN
  const token = authHeader && authHeader.split(' ')[1]; // check if authHeader then return $TOKEN

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden (token not valid)
    req.user = user;
    next();
  });
}
```

- authorize a request

```js
app.get('/posts', authorize, (req, res) => {
  // filter out none-matching posts
  res.json(posts.filter((post) => post.username === req.user.name));
});
```

- `requrests.rest`

```rest
GET http://localhost:3000/posts
Authorization: Bearer $TOKEN
```

### SoC Auth Server

- server for handling authentication

```js
let refreshTokens = []; // assume it as the DB

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401); // Unauthorized
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403); // Forbidden
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.post('/login', (req, res) => {
  // ...

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken); // assume this as the DB to store refreshTokens

  res.json({ accessToken, refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(
    user /**payload */,
    process.env.ACCESS_TOKEN_SECRET /**secret key */,
    {
      expiresIn: '10s', // ~30min in real-use case
    } /**options */
  );
}
```

```rest
POST  http://localhost:4000/token
Content-Type: application/json

{ # refresh token
  "token": $REFRESH
}
```

- handling logout

```js
// logout to delete the refreshToken
app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204); // No Content
});
```

```rest
DELETE http://localhost:4000/logout
Content-Type: application/json

{
  "token": $REFRESH
}
```
