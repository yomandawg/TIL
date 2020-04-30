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