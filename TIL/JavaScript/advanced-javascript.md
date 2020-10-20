# Advanced Javascript

## safe constructor

```js
function User(first, last) {
  if (this instanceof Users) {
    this.first = first;
    this.last = last;
  } else {
    return new Users(first, last); // safeguard for missing `new` keyword
  }
}

var user1 = new User('Ray', 'Kim');
var user2 = User('Eric', 'Kim'); // creates a new object and bind this to it anyways
```

## handling floating points

- binary nature of the encoding binary to floating decimals cannot be represented with perfect accuracy

```js
0.3 - 0.1; // 0..19999999...8
2232.0 * 0.1; // 223.2000.......2
```

- solution - convert to integer then calculate

```js
(0.3 * 10 - 0.1 * 10) / 10;
(2232.0 * 10 * 0.1 * 10) / 1000;
```

## immutable object

### freezing

- frozen object cannot be changed in `use strict`

```js
'use strict';

const obj = { prop: 1 };
Object.freeze(obj);
const obj2 = Object.freeze({ prop: 1 });

obj.prop = 2; // not changed
delete obj.prop; // not changed
```

```js
// Error: cannot assign to read only property
obj.newProp = 'a';
Object.defineProperty(obj, 'newProp', { value: 'a' });

// also applies to prototypes
Object.setPrototypeOf(obj, { newProp: 'a' });
obj.__proto__ = { newProp: 'a' };
```

### deep freeze

- freezing child property objects

```js
function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj);

  for (let name of propNames) {
    const value = obj[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
}
```

## private object

- private object by closure

```js
const getPrivateObj = (function () {
  // reference object
  let privateObj = {
    secret: 1234,
  };

  return function () {
    // able to access privateObj from a closure
    // return { ...privateObj }; // return a new object
    return Object.create(privateObj);
  };
})();
```

## type coercion

- `- * / %` converts value to numbers

```js
25 - true; // 25 - 1
25 * false; // 25 * 0
5 - '1'; // 5 - 1
```

- prioritizes string conversion

```js
5 + '1'; // '5' + '1'
```

- false conversion

```js
false, 0, -0, '', NaN, null, undefined;
```
