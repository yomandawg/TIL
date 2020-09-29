# _
> `npm install lodash`

* `_.memoize(func, [resolver])`
  - memoize the return value
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  console.log('calculating...')
  return fibonacci(n-1) + fibonacci(n-2)
}

const memoizedFibonacci = _.memoize(fibonacci)

memoizedFibonacci(3) // calculating... return 2
memoizedFibonacci(3) // return 2
```

* `_.uniq(array)`
  - create a duplicate-free array

* `_map(collection)`

* `_chain(value)...value()`
  - creates a wrapper instance that wraps value with explicit method chain sequences enabled
  - unwrapped with `value`
