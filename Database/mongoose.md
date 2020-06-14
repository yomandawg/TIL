# Mongoose

```javascript
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true // automatic index builder
})

// modeling the data
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  }
})

const me = new User({
  name: 'Yoman',
  age: 27
})

// actually add it into the database
me.save().then(res => {
  // do something
}).catch(err => {
  // do something
})
```

### Sanitizing Data
* `npm install validator`
* mongoose API built-in's
```javascript
const validator = require('validator')

const User = mongoose.model('User', {
  name: {
    // mongoose API built-in's
    trim: true
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  ...
})
```