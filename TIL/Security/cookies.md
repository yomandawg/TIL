# Cookies

- Security flags for session cookies (bcrypt'ed)

```
npm i express express-session
```

```js
// deprecated
app.use(
  session({
    cookieName: 'session',
    secret: 'some_random_string',
    duration: 30 * 60 * 1000,
    httpOnly: true, // don't let JS access cookies (ALWAYS!) document.cookie = ''
    secure: true, // only set cookies over https
    ephemeral: true, // destroy cookies when the browser closes
  })
);
```

```js
app.use(
  session({
    name: SESSION_NAME,
    resave: false, // do not store sessions from the request if they weren't modified
    saveUninitialized: false, // do not save uniniialized empty sessions
    secret: SESSION_SECRET,
    cookie: { maxAge: SESSION_LIFETIME, sameSite: true, secure: true },
  })
);
```

- _optional_:
  - `npm install helmet` for secure headers
  - passport.js

### `SameSite`

- declare if your cookie should be restricted to a first-party (same-site; current domain; _public suffix_ defined) context

- `SameSite=Strict`

```http
Set-Cookie: promo_shown=1; SameSite=Strict
```

- when the user is on same site the cookie was issued on, the cookie will be sent with the request
- when following a link into that site, (from another site or a email link), the cookie will not be sent

* `SameSite=Lax` (default)

```http
Set-Cookie: promo_shown=1; SameSite=Lax
```

- allow the cookie to be sent with the top-level navigations
- when the user is on the other site, the cookie will not be sent when requesting from the example site
  - `<img src="example.com/image.png">` &rarr; _no cookies_
- when the reader follows the link to the example site on the other page, the request will include the cookie
  - `<a href="example.com/temp.html">` &rarr; _cookie_

* `SameSite=None`

```http
Set-Cookie: promo_shown=1; SameSite=None
```

- intentionally want the cookie to be sent in a third-party context
