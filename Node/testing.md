# Testing Node.js Application

## Jest
> `npm -i jest --save-dev`

* set package
```json
// @package.json
{
  ...
  "scripts": {
    ...
    "test": "jest", // default
    "test": "jest --watch", // for watch mode
    "test": "env-cmd -f ./config/test.env jest --watch", // for test environment with `env-cmd` module
    "test": "env-cmd -f ./config/test.env jest --watch --runInBand" // for testing in series (without conflict between test suites)
  }
}
```
* jest detects `*.test.js`

* example
```javascript
// @nameofthetest.test.js
test('Should calculate total with tip', () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
})
```

* asynchronous testing
  * `done` or `async` function
```javascript
test('Async test demo', (done /*provide `done` parameter */) => {
  setTimeout(() => {
    expect(1).toBe(2)
    done() // test judged after `done` is called
  }, 2000)
})

// `done` parameter example
test('Should add two numbers.', (done) => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})

// async callback example
test('Should add two numbers async/await', async () => {
  const sum = await add(10, 22)
  expect(sum).toBe(32)
})
```

* `toBe` vs `toEqual`
  * `toBe` uses `===` while `toEqual` compares content
```javascript
expect({}).toBe({}) // false
expect({}).toEqual({}) // true
```
* type comparing example
```javascript
expect(user.avatar).toEqual(expect.any(Buffer)) // check if the data is Buffer
expect(user.avatar).toEqual(expect.any(String)) // check if the data is String
```

### SuperTest
> `npm i supertest --save-dev`\
* allows `request` testing without running the app

### Test environment
* @`config/test.env`
```env
...
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api-test // set test DB
```
* @`package.json`
```json
...
"scripts": {
  ...
  "test": "env-cmd -f ./config/test.env jest --watch" // with `env-cmd` module
},
"jest": {
  "testEnvironment": "node"
},
```

#### beforeEach & afterEach
```javascript
// wipe out the test DB for testing
beforeEach(async () => {
  await User.deleteMany() // clear all users
  await new User(userOne).save() // create dummy user
})
```

### __mocks__
* provide dummy processes for testing
```javascript
// @tests/__mocks__/@sendgrid/mail.js
module.exports = {
  setApiKey() {

  },
  send() {
    
  }
}
```