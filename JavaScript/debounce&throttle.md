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
