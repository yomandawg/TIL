# Event Delegation

- add event listener for multiple elements

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Tomato</li>
</ul>
```

```js
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    e.target.style.color = 'green';
  }
});

const orange = document.createElement('li');
orange.textContent = 'Orange';
document.querySelector('ul').appendChild(orange);
```
