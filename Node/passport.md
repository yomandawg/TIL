# Passport
> authentication middleware for Node.js

## Strategies

### Github
> `passport-github`\
* Passport strategy for authenticating with Github using the OAuth 2.0 API.
```javascript
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
```
* [**Register**](https://github.com/settings/applications/new)
  * Github > Settings > Developer Settings > OAuth Apps > `Register a new application`

### Example
* *Client ID* - public key
* *Client Secret* - secret key
* `Revoke all user tokens` - remove all user tokens (log everyone out)
* `Reset client secret`
```javascript
// @config.js
module.exports = {
  clientID: '...',
  clientSecret: '...',
  callbackURL: '...'
}
```
* make sure to add `config.js` to `.gitignore`
```javascript
// @app.js
/* PASSPORT FILES */
const session = require('express-session'); // npm install express-session
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
/* PASSPORT CONFIG */
app.use(session({
  secret: 'any salt', // password salt
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session()); // need to setup `express-session`
const passportConfig = require('./config');
passport.use(new GithubStrategy(passportConfig,
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));
/* SERIALIZE PART */
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
```
```javascript
// @index.js
const passport = require('passport');
router.get('/login', passport.authenticate('github'));
router.get('/auth', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: 'loginFailed'
}));
```