# ES6

## Arrow Function

- Parameters

```javascript
// no parameters
var foo = () => return 'bar';
foo(); // bar

// one parameter
var foo = x => return x;
foo('bar'); // bar

// many parameters
var foo = (a, b) => return a + b;
foo(1, 2); // 3
```

- With Callbacks

```javascript
var numbers = [1, 2, 3];
var oddNumbers = numbers.filter((x) => x % 2); // [1, 3]
```

- `this`

```javascript
let foo = {
  bar: 'yo',
  bas: function () {
    setTimeout(() => {
      console.log(this.yo);
    }, 1000);
  },
};
foo.yo(); // 1000ms 후 "yo"
```

## rest parameter

- Used for spreading out objects or copying them

```javascript
const rest = (...nums) => {
  console.log(nums);
  return nums.map((num) => num * 2);
};
const result = rest(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
console.log(result); // [2, 4, 6, 8, 10]
```

```javascript
// spread syntax (arrays)
const myArr = ['a', 'b', 'c']; // a b c
console.log(...myArr); // a b c
const myArr_ = [...myArr, 'd', 'e']; // ['a', 'b', 'c', 'd', 'e']
```

```javascript
// spread syntax (objects)
const myObj = { name: 'yo', age: 29, job: 'swe' };
const myObjClone = { ...myObj }; // clone of myObj
const myObjClone_ = { ...myObj, location: 'seoul' };
```

## Set (data structure)

- Allow no duplicate values

```javascript
let myArr = ['a', 'a', 'b', 'b', 'c', 'c'];
const mySet = new Set(myArr);
console.log(mySet); // Set { 'a' , 'b', 'c' }

myArr = [...mySet]; // ['a', 'b', 'c']
myArr = [...new Set(myArr)]; // simpler way
```

```javascript
const mySet = new Set();
mySet.add(20).add(20).add(25); // Set { 20, 25 }
mySet.delete(25); // Set { 20 }

console.log(mySet.size); // 1
console.log(mySet.has(20), mySet.has(25)); // true false

mySet.clear(); // clear the set
```

## Symbol

- a premitive object type that's completely unique
- no symbols can be equal to each other

```javascript
// not creating an object; `Symbol` is a primitive type
const symbolOne = Symbol('yo');
const symbolTwo = Symbol('yo');

console.log(symbolOne, symbolTwo); // Symbol() Symbol()
console.log(typeof symbolOne); // symbol
console.log(symbolOne == symbolTwo, symbolOne === symbolTwo); // false false
```

```javascript
const ninja = {};
ninja['belt'] = 'orange';
ninja['belt'] = 'black'; // overwrite
console.log(ninja); // { belt: 'black' }

// used for setting unique object keys
const myObj = {};
myObj[Symbol('yo')] = 'ray';
myObj[Symbol('yo')] = 'kim';

console.log(myObj); // { [Symbol(yo)]: 'ray', [Symbol(yo)]: 'kim' }
```

## Object Destructing

```javascript
const product = {
  label: 'Notebook',
  price: 3,
  stock: 201,
};

const { label, stock, rating } = product;
console.log(label, stock, rating); // Notebook 201 undefined

const { label: productLabel } = product;
console.log(label); // error
console.log(productLabel); // Notebook

// default value
const { price = 1, yo = 5 } = product;
console.log(price, yo); // 3 5
```

```javascript
// object inputs
const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};
transaction('order', product); // order Notebook 201

// default object
const transaction = ({ arg1, arg2 } = {}) => {
  // do something
};
```

### Key Interpolation

```javascript
const myObject = {'a': 1, 'b': 2};

{ ...myObject, ['a']: 3 }; // {a: 3, b: 2}
{ ...myObject, ['c']: 3 }; // {a: 1, b: 2, c: 3}
```
