# Express.js
> Node.js Web Framework

* application generator
  * `npm install -g express-generator` &rarr; `express`
  * `express --view=pug [myapp]`
    * view engine set to **pug**

* run app
  * `DEBUG=myapp:* npm start`

* Routing
  * `app.METHOD(PATH, HANDLER)`
```javascript
app.post('/user', (req, res) => {
    res.send('POST something')
}))
```

* Serving static files
  * `express.static(root, [options])`
```javascript
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'))
```

* error handlers
```javascript


```


## Middleware Functions

### `next()`
> a convention method in express.js
* middleware function that calls the next middleware in stack
```javascript
app.get('/', (req, res, next) => {
    next(); // callback parameter for calling the next middleware
})
```