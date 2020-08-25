# Express.js

> Node.js Web Framework

## Express Generator

- `npm install express-generator`
- `npx express ProjectName`
  - `npx express ProjectName --view=ejs`

```bash
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```

### Error Middleware

- handling errors with middlewares

```javascript
const errorMiddleware = (req, res, next) => {
  throw new Error('From my middleware.');
};

router.get(
  '/temp',
  errorMiddleware,
  (req, res) => {
    res.send();
  },
  /*second callback for error handling*/ (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
```

- example with `multer`

```javascript
const upload = multer({
  // properties
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // acts as an error handling middleware
      return cb(new Error('Please upload an image.')); // Error throwing
    }
    cb(undefined, true);
  }
});

router.post(
  '/users/me/avatar',
  upload.single('avatar'),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    // catches the 'Please upload an image.' error
    res.status(400).send({ error: error.message });
  }
);
```

```html
<!-- image testing -->
<img src="data:img/jpg;base64,${encoded stuff}" />
```

#### sharp

- resizing and limiting file buffer

```javascript
// modify the buffer for uniform data
const buffer = await sharp(req.file.buffer)
  .resize({ /*uniform size*/ width: 250, height: 250 })
  .png()
  .toBuffer();
req.user.avatar = buffer; // save it back into the request object
```

## Middlewares

### morgan

- logging incoming requestss

### body-parser

- parse HTTP request to contain a json body
