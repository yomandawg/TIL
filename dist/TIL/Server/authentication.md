# Server Authentication

### Cookie vs Token

- somewhat of implement _state_ into the state-less HTTP
- server identifies the _state_ with the cookie or token

|               Cookie                |           Token           |
| :---------------------------------: | :-----------------------: |
| included on all requests by default |      manual write-up      |
|        unique to the domain         | can be sent to any domain |

#### Cookie

```http
Headers
cookie: {}
Body
{
  color: 'red'
}
```

- included on all requests by default
- cannot be shared with other domains - security

#### Token

```http
Headers
authorization: j4auE9v...
Body
{
  color: 'red'
}
```

- manually included in the request
- can be sent to any domain (allows different devices or APIs to share authentication)

### Encryption

#### Bcrypt

- `npm i bcrypt-nodejs`

#### JWT

- `npm i jwt-simple`

- Signup: User ID + Secret String (encryption) = **JWT** &rarr; user
- Login: **JWT** + Secret String (decription) = user verified

```js
function userToken(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { sub /* subject */: user.id, iat /* issued time */: timestamp },
    secretKey
  );
}
```

### Passport

- `npm i passport passport-jwt passport-local`

* JWT Strategy

```js
// services/passport.js
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
```

- Authentication with JWT

```js
// options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.subdomains, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
```

- Local Strategy (login with email/password)

* compare incoming password + Secret Key === hashed password

```js
// models/users.js
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};
```

```js
// services/passport.js
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(passsword, function (err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});

passport.use(localLogin);
```

- token distribution

```js
// router.js

// filter authentication first
const requireSignin = passport.authenticate('local', { session: false });

app.post('/signin', requireSignin, Authentication.signin);
```

```js
// controllers/authentication.js

// user has already passed authentication (with reuquireSignin middleware)
exports.signin = function (req, res, next) {
  // just need to give a token
  res.send({ token: tokenForUser(req.user) });
};
```

## CORS

> Cross Origin Resource Sharing

- Browser's security behavior &rarr; customize server to handle CORS requests

* `npm i cors`

```js
// server/index.js
app.use(cors());
```
