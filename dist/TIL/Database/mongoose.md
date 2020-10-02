# Mongoose

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true, // automatic index builder
});

// modeling the data
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
});

const me = new User({
  name: 'Yoman',
  age: 27,
});

// actually add it into the database
me.save()
  .then((res) => {
    // do something
  })
  .catch((err) => {
    // do something
  });
```

### Sanitizing Data

- `npm install validator`
- mongoose API built-in's

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

### Schema

#### Middleware

```javascript
const userSchema = new mongoose.Schema({
  // schema
})

userSchema.pre(/* name of the event */, /* async (next) => {} */)
userSchema.post(/* name of the event */, /* async (next) => {} */)
```

#### statics (model methods)

- accessible on **model**s

```javascript
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login.');
  }
  return user;
};

const user = await User.findByCredentials(req.body.email, req.body.password);
```

#### methods (instance methods)

- accessible on **instance**s

```javascript

```
