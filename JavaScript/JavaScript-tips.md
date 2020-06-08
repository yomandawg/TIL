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