# JavaScript Stuff

- 표현**식**(=) - function statement(expression)
  - **식**(=) resolves(;): `const a = function() {};`
- 선언**문** - function declaration

  - 선언: `function a() {}`

- `new` operator

  - create an instance of an object type that has a `constructor` function

  1. create a blank object
  2. sets the `constructor` of this object to target object
  3. passes the newly created object as `this`
  4. returns `this` || returned object

- `prototype`

  - browser checks for `person.something`
    - instance's method(person.something) &rarr; constructor defined(Person.something) &rarr; `person.__proto__.s`

- `class`

```js
class Animal {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.yo = 1;
  }

  speak() {
    return 'new Animal().speak()';
  }

  static eat() {
    return 'Animal.eat()';
  }
}
```

- is equivalent to

```js
function Animal(height, width) {
  this.height = height;
  this.width = width;
}

Animal.prototype.speak = function () {
  return 'new Animal().speak()';
};

Animal.eat = function () {
  return 'Animal.eat()';
};
```
