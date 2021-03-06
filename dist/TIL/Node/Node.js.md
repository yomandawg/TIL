# Node.js

## [PM2](https://pm2.keymetrics.io/)

> a daemon process manager that helps managing and keeping the node.js application online 24/7

- automatically restart the application when a file is modified

## [nodemon](https://nodemon.io/)

> a utility that monitors any changes in the source and automatically restart the server

### Commands

```bash
# start an app with pm2 (with options)
pm2 start app.js
pm2 start app.js --watch
pm2 start app.js --watch --no-daemon
pm2 start app.js --watch --ignore-watch="data/* sessions/*" --no-daemon

# kill all pm2 processes
pm2 kill

# monitor all processes launched
pm2 monit

# list all processes
pm2 list

# manage a process
pm2 stop
pm2 restrat
pm2 delete

# view logs
pm2 log
```

## Promise

> Notes from https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise\
> 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 표현하는 객체

- 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위함
- 비동기 메서드에서 마치 동기 메서드처럼 값을 반환 가능
  - 최종 결과를 반환하지는 않고, `Promise`를 바로 반환해서 미래의 어떤 시점에 결과를 제공

### 형태

- 대기(_pending_): 이행하거나 거부되지 않은 초기 상태
- 이행(_fulfilled_): 연산 성공
- 거부(_rejected_): 연산 실패

- `fulfilled` or `rejected` 상태의 프로미스는 `then` 메서드로 후속 처리 대기열에 올릴 수 있음

  - `Promise.prototype.then()`, `Promise.prototype.catch()`는 `Promise` 객체를 반환하므로 `then`, `catch` 체인 연결이 가능

- `Promise.resolve(value)`

  - Promise 연산 성공시 이행값(`result`) resolve와 함께 `Promise.then` Promise 객체 반환
  - `then`을 통한 resolve 처리

- `Promise.reject(reason)`
  - Promise 연산 실패(`error`)시 `reason`과 함께 거부된 `Promise` 객체 반환
  - `catch`를 통한 error 처리

```javascript
const oddNumber = function (a, b) {
  return new Promise((resolve, reject) => {
    if ((a + b) % 2) {
      resolve('Odd Number', a + b);
    } else {
      reject('Even Number', a + b);
    }
  });
};
var x = oddNumber(1, 2)
  .then((result) => {
    console.log(result);
    return result;
  })
  .catch((error) => {
    console.log(error);
    return error;
  });
console.log(x); // returns `<pending>` before fully processing the `Promise`
```

## Ajax

> Asynchronus JavaScript & XML

- 생산성 향상 - Single Page Application

  - Resource 재사용
  - Resource 동적 load (DOM 변경)
  - 서버와 자유로운 통신 (`XMLHttpRequest`)

- `fetch` API
  - `response` 객체를 반환하는 `Promise`

### XMLHttpRequest(XHR)

- 서버와 상호작용하기 위해 사용 - 전체 페이지의 reload 없이 URL로부터 데이터를 받아옴
- 모든 종류의 데이터를 받아올 수 있음

### JavaScript polyfill fetch

- 유물 브라우저에서도 `fetch`를 사용할 수 있게 해주는 API

### Axios

- Promise-based HTTP client that exposes the same API for both server(node.js) and client(browser)
- For tasks shared between server and client but use different platforms, it's recommended to wrap the platform-specific implementations inside a universal API, which could be `axios`.

## async function

- `AsyncFunction` 객체를 반환하는 비동기 함수 형태
- Event Loop을 통해 비동기적으로 작동하는 함수 &rarr; `Promise`로 결과를 반환함

## Security

- `db.escaple(something)`
- `sanitizeHTML(something)`

## module

> `.js` 확장자 캡슐화 단위

```javascript
// temp.js using `var exports`
var exports = (module.exports = {
  yo: function () {
    return 'yo!';
  },
});

exports.yoFunc = function () {
  return 'yoFunc!';
};

/* require */
var yo = require('./temp');
yo.yo(); // yo!
yo.yoFunc(); // yoFunc!
```

### Module System

> 모듈 생태계 규칙 - converted

- CommonJS == `require`
- AMD(asynchronous module definition) == `define` - `require`
- ES6 == `import`

---

## Useful Modules

#### chalk

```javascript
const chalk = require('chalk');
const greenMsg = chalk.inverse.green.bold('success');
```

#### validator

#### nodemon

#### yargs

```javascript
const yargs = require('yargs');

yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    console.log('Title: ' + argv.title);
    console.log('Body: ' + argv.body);
  },
});

yargs.parse();
```

#### postman-request

```javascript
// raw request with `https` module
const https = require('https');

const request = https.request(url, (response) => {
  let data = '';
  response.on('data', (res) => {
    // do something
  });
  response.on('end', (res) => {
    // do something
  });
});
request.on('error', (err) => {
  // do something
});
request.end();
```

#### bcryptjs(pure javascript) & bcrypt(C++)

```javascript
const bcrypt = require('bcryptjs');

const myFunction = async () => {
  const password = 'asdf1234!';
  // password hashing
  const hashedPassword = await bcrypt.hash(
    password,
    /* how many rounds of hashing */ 8
  );

  // password matching
  const isMatch = await bcrypt.compare(password, hashedPassword);
};
```

#### jsonwebtoken

```javascript
const jwt = require('jsonwebtoken');
const myFunc = async () => {
  const token = jwt.sign(
    {
      _id: 'abc123' /* payload */,
    },
    'thisismynewcourse' /* verification secret sign */,
    {
      expiresIn: '7 days' /* options */,
    }
  );

  const data = jwt.verify(token, 'thisismynewcourse');
};
```

- access by headers (e.g. Postman)
  - key: `Authorization`
  - value: `Bearer ${token}`

```javascript
// middleware example
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
```

#### multer

- `form-data`, `key`

```javascript
const multer = require('multer')

const upload = multer({
  dest: 'uploads', // destination folder
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter(req, file, cb) {
    // endsWith
    if(!file.originalname.endsWith('.pdf')) {
      return cb(new Error('Pleaes upload a PDF'))
    }

    // match regex
    if(!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please a upload a word document'))
    }

    // passed
    cb(undefined, true)

    // cb(new Error('File must be a PDF')) // error callback
    // cb(undefined, true) // expected upload
    // cb(undefined, false) // ignore upload
  }
}

app.post('/upload', upload.single('upload'/*matching `key` for the body*/), (req, res) => {
  res.send()
})
```

#### sendgrid

#### env-cmd

- `npm i env-cmd --save-dev`
- use environment variables stored in `.env` file
- access with `process.env.$NAME`

```json
// @package.json
{
  ...
  "scripts": {
    ...
    "dev": "env-cmd -f ./config/dev.env nodemon src/index.js"
  },
```

```javascript

```

#### socket.io

```javascript
// server -> client
socket.emit; // to specific client
io.emit; // to every client
socket.broadcast.emit; // to every client except this one

socket.join; // allow emitting to a specific room
io.to.emit; // to every client in a specific room
socket.broadcast.to.emit; // to every client in a specific room except this one
```

#### bad-words

#### mustache

#### moment

#### query-string (qs)

#### axios

```javascript
// preconfigured axios object with custom config
axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    ...
  }
});
```
