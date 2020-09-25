# Debouncing

- Debouncing Javascript Events

```javascript
export const debounce = (func, delay) => {
  let timeout;

  return () => {
    const execute = () => {
      timeout = null;
      func();
    };

    clearTimeout(timeout);
    timeout = setTimeout(execute, delay);
  };
};
```

# Throttling

```js
let timer = null;
function throttleGetPost() {
  if (!timer) {
    loading.classList.add('show');
    timer = setTimeout(function () {
      timer = null;
      getPost();
    }, 500);
  }
}
```
