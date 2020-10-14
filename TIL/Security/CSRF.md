# CSRF

> Cross Site Request Forgery

### Example

- bank.com website (form)

```html
<!-- vulnerable html form -->
<form>
  <input type="text" name="account" />
  <input type="text" name="amount" />
  <input type="text" name="for" />
</form>
```

- suspicious tag from a hacker

```html
<!-- clicking this tag will send a request to the bank server -->
<img
  src="http://bank.com/withdraw?account=yoman&amp;amount=1000000&amp;for=Badguy"
/>
```

- since _cookies are attached to any request to a given origin_, it is necessary to carefully validate the request

#### Solution

- CSRF token strategy
  1. generate a random token on every request
  2. insert it to the cookie
  3. put it in the form input field to send to the web server
  4. web server validates the cookie
