# JavaScript Tips


## Reduce
* A good example to understand `reduce`
```javascript
const beforeReduce = [
  { name: 'ray', address: 'Fullerton' },
  { name: 'yj', address: 'Dongtan' },
  { name: 'uos', address: 'Seoul' }
]

const getReduced = (data) => {
  data.reduce((accumulator, item) => {
    accumulator[item.name] = { address: item.address };
    return accumulator
  }, {});
}

const afterReduce = getReduced(beforeReduce);
// const afterReduce = {
//   ray: { address: 'Fullerton' },
//   yj: { address: 'Dongtan' },
//   uos: { address: 'Seoul' }
// }
```
* Another example with `Promise`
```javascript
// prepare a promise that always resolves to call `then` right away
var sequence = Promise.resolve();

story.chapterUrls.reduce(function(sequence, chapterUrl) {
  return sequence.then(function() {
    return getJSON(chapterUrl);
  }).then(function(chapter) {
    addHtmlToPage(chapter.html);
  });
}, Promise.resolve());
```


## encodeURI
* encodes a *URI* by replacing each characters by UTF-8 encodings
```javascript
const encoded = encodeURI('https://mozilla.org/?x=шеллы');
// expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
  console.log(decodeURI(encoded));
  // expected output: "https://mozilla.org/?x=шеллы"
} catch (e) { // catches a malformed URI
  console.error(e);
}
```


## call vs. apply
* the difference is that `apply` invokes the function with *arguments* as an `array`, while `call` requires the parameters be listed explicitly.
* A userful mnemonic is "**A** for **A**rray and **C** for **C**omma."
```javascript
myFunc.apply(/* binds `this` */, ['yo', 'man'])
myFunc.call(/* binds `this` */, 'yo', 'man')
myFunc.call(/* binds `this` */, ...['yo', 'man']) // ES6 spreads
```

## new vs. Object.create()
> javascript inheritance\
### new
1. creates a new empty object `{}`
2. binds the value of `this` to the new empty object
3. calls the `constructor` function to 'build' the object
### Object.create
1. create a new object
2. set the prototype of the newly created object to the original object
3. binds `this` to it
```javascript
const animal = {
  eat: "Nom"
}
const dog = Object.create(animal)
dog.isPrototypeOf(animal) // true
dog.eatFood = 'NomNom'
dog // { eatFood: "NomNom" }
dog.eat // Nom

// Problem with prototypal inheritance
const cat = Object.create(animal)
cat.eat = 'MeowMeow'
dog.eat // MeowMeow
// prototype is overall shared with all inherited objects
```