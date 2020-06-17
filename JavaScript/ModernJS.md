# Modern JavaScript


## JavaScript Data Types
> Primitive vs. Reference

### Primitive
* After creation of primitive types such as `string` or `number` the data is stored in `stack`
* the value is stored and mapped to a variable in the stack

### Reference
* Reference types such as `object` is stored in `heap`
* After declaration of an object, it consists of variables each mapped to a `pointer` value that is stored in the `stack`
* When changing the value in the object, the pointer value is changed

```javascript
// call by value vs. call by reference
let one = 50;
let two = one;
console.log(`${one} ${two}`); // 50 50
scoreOne = 100;
console.log(`${one} ${two}`); // 100 50


const userOne = { name: 'yo', age: 20 };
const userTwo = userOne;
console.log(userOne, userTwo); // {'yo', 20}, {'yo', 20}
userOne.age = 40;
console.log(userOne, userTwo); // {'yo', 40}, {'yo', 40}
```


## Document Object Model
### DOM Query
* `documnet.getElementById`, `document.querySelector`, `document.querySelectorAll`

### DOM Tree
* `item.children`(HTMLCollection)
* `item.parentElement`, `item.nextElementSibling`, `item.previousElementSibling`
* `item.append`, `item.prepend`

### HTML Collection
* `document.getElementsByClassName`, `document.getElementsByTagName`
* `Array`-fy - `Array.from(HTMLCollection)`

### Element
* `item.innerText`(visible only),` item.textContent`(all content), `item.innerHTML`
* `item.getAttribute`, `item.setAttribute`
* `item.createElement`
* `form.(id).value`, `form.(name).value`, `form.reset`

### CSS property
* `item.style`, `item.style.[propertyName]`(JS substitutes *dashes* to *camelCase*)
  * `item.style.fontSize`, `item.style.textDecoration`
* `item.classList`
  * `item.classList.add`, `item.classList.contain`, `item.classList.remove`, `item.classList.toggle`

### Events
* `item.addEventListener(event, callback: [event])`
  * events: `'click'`, `'copy'`, `'mousemove'`, `'wheel'`, `'submit'`, `'keyup'`
  * callback arg `event.[eventProperty]`
    * `e.target === item`, `e.target.tagName`
    * `'mousemove'`: `e.offsetX`, `e.offsetY`
    * `submit`: `e.preventDefault`
* Event Bubbling - 'bubbles up' to execute its parent's event
  * `e.stopPropagation` - prevents invoking parent event


## RegEx
# Regular Expression
```
^ : start of string
$ : end of string
{N} : N times
{N,} : at least N
{N, M} : N to M times
[A-Z] : range A to Z
[0-9] : range 0 to 9
[0-9A-Za-z] : Any
[xy] : x or y
[^xy] : except x and y
x+ : one or more x's
x* : zero or more x'Ds
x? : possibly exist
x|y : x or y exists
. : any character
```
```
\^ : ^
\d : digit
\D : non digit
\s : space
\S : non space
\t : tab
\w : word (alphabet, numbers, _)
\w : non word
```
* `pattern = /^[a-z]{6, }$/`, `pattern.test`
* `string.search(pattern) => position | -1`


## Global Object
### `window`
* `setTimeout`, `setInterval`
  * `clearInterval(__handler)`
* `scrollTo`
* 

## Data Structures
### Array
* non-destructive
  * `filter`, `map`
* destructive
  * `sort`, `reverse`
* iterate
  * `find`
* accumulate
  * `reduce((accumulator, current) => {}, initial)`

### String
* `trim`, `match`, `includes`, `toLowerCase`, `toUpperCase`

## Date
* `getTime`, `getFullYear`, `getMonth`, `getDate`, `getHours`, `getMinutes`, `getSeconds`
* `toDateString`, `toTimeString`, `toLocaleDateString`

### Date-FNS
* `isToday`, `format(...)`
* `distanceInWords`


## XMLHttpRequest
* `open`, `send`
* `addEventListener('readystatechange')` - catch request phase changes
  * `readyState` - total of 4 states
    * 0 : `UNSENT`
    * 1 : `OPENED`
    * 2 : `HEADER_RECEIVED`
    * 3 : `LOADING`
    * 4 : `DONE`

### ReponseText
* `request.readyState === 4 && request.status === 200`

### callback
* **convention** - `(err, data) => {}`


## JSON
* `parse`


## Promise
```javascript
// callback example
const myCallback = (callback) => {
  setTimeout(() => {
    // callback('This is my error!')
    callback(undefined, [1, 4, 7])
  }, 2000)
}

myCallback((error, result) => {
  if (error) {
    return console.log(error)
  }
  console.log(result)
})

// same code with `Promise`
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject('Things went wrong!')
    resolve([7, 4, 1])
  }, 2000)
})

myPromise.then((result) => {
  console.log('Success!', result)
}).catch((error) => {
  console.log('Error!', error)
})
```
* `resolve(data)`, `reject(err)`
* `.then(data => {}, err => {})`
* `.then(data => {}).catch(err => {})`
```javascript
const getTodos = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4 || request.status === 404) {
        reject('error getting resource');
      }
    });

    request.open('GET', resource);
    request.send();
  });
};

getTodos('todos.json')
  .then(data => {
    console.log('promise 1 resolved: ', data);
    return getTodos('todos1.json'); // returns a Promise
  }).then(data => { // Promise chaining
    console.log('promise 2 resolved: ', data);
    return getTodos('todos2.json');
  }).then(data => {
    console.log('promise 3 resolved: ', data);
  }).catch(err => { // catches any error
    console.log('promise rejected: ', err);
  });
```


## fetch API
> Network request API that uses Promises\
* `fetch` only returns `reject` only when there is a network or format error
* `response.json(): Promise<any>`
```javascript
fetch('todos.json').then(res => {
    console.log('resolved', res)
    return res.json(); // json Promise
  }).then(data => {
    console.log(data); // res.json data
  }).catch(err => {
  console.log('rejected', err)
});
```

## async & await
* `async () => Promise<any>` - always return a `Promise`
* `await` - stops javascript until the Promise has resolved (non-blocking; async function itself isn't blocking; happens all inside the async function)
```javascript
const getTodos = async () => {
  const response = await fetch('todos.json')
  const data = await response.json();
  return data;
}
```

### Error
* `throw`, `new Error()`
```javascript
const getTodos = async () => {
  const response = await fetch('nonexistent');
  if (response.status !== 200) {
    throw new Error('cannot fetch the data'); // throw Error to catch
  }
  return response;
}

getTodos()
  .then(data => console.log('resolved: ', data))
  .catch(err => console.log('rejected: ', err))
```


## Common Features

### Object Shorthand Notation
```javascript
// object property can be shortened to just its property name when the property name has equal naming with its value
{ A: A, B: B } === { A, B }
```

### Destructuring
```javascript
(data) => {
  // const a = data.a
  // const b = data.b
  // is equal to
  const { a, b } = data;
}
```


## Local Storage
* `window.localStorage`
```javascript
localStorage.length
localStorage.setItem('name', 'mario')
localStorage.getItem('name')
localStorage.removeItem('name')
localStorage.clear();
localStorage.setItem('name', JSON.stringifiy(names))
```

### JSON Object
```javascript
JSON.stringify(object)
JSON.parse(jsonObject)
```


## OOP

### `new` keyword
1. creates a new empty object `{}`
2. binds the value of `this` to the new empty object
3. calls the `constructor` function to 'build' the object

### Class Inheritance (Subclass)
```javascript
class Admin extends User {
  constructor(username, email, title) {
    super(username, email); // from `User` class constructor
    this.title = title;
  }
}
```

### Prototype
```javascript
// creating a class object without the `class` keyword
function User(username, email) {
  this.username = username;
  this.email = email;
  // this.login = function() {
  //   // do something
  // }
}

// using `prototype` for methods
User.prototype.login = function() {
  // do something
}
```

### Prototype Chaining and Inheritance
```javascript
function Admin(username, email, title) {
  User.call(this, username, email); // inherit properties from `User` object
  this.title = title;
}

// prototype inheritance
Admin.prototype = Object.create(User.prototype);
// 1. create a brand new `Object`
// 2. pass a copy of the prototype
// 3. acts like `chain` of prototypes

// create a new method
Admin.prototype.deleteUser = function() {
  // do something
};
```