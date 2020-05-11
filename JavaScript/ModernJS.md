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

### CSS property
* `item.style`, `item.style.[propertyName]`(JS substitutes *dashes* to *camelCase*)
  * `item.style.fontSize`, `item.style.textDecoration`
* `item.classList`
  * `item.classList.add`, `item.classList.remove`, `item.classList.toggle`

### Events
* `item.addEventListener(event, callback: [event])`
  * events: `'click'`, `'copy'`, `'mousemove'`, `'wheel'`
  * callback arg `event.[eventProperty]`
    * `e.target === item`, `e.target.tagName`
    * `'mousemove'`: `e.offsetX`, `e.offsetY`
* Event Bubbling - 'bubbles up' to execute its parent's event
  * `e.stopPropagation` - prevents invoking parent event