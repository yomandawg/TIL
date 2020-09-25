## Permutations

- <sub>arr</sub>P<sub>limit</sub>

```js
function permutate(arr, limit = arr.length) {
  const length = arr.length;
  const value = Array(limit);
  const visit = Array(length);

  return (function* backtrack(num) {
    if (num === limit) yield value.slice();
    for (let i = 0; i < length; i++) {
      if (!visit[i]) {
        value[num] = arr[i];
        visit[i] = 1;
        yield* backtrack(num + 1);
        visit[i] = 0;
      }
    }
  })(0);
}
```

## Combinations

- <sub>arr</sub>C<sub>threshold...arr.length</sub>

```js
function combine(arr, threshold = 1) {
  const length = arr.length;

  return (function* generate(value, offest) {
    if (value.length >= threshold) yield value.slice();
    for (let i = offset; i < length; i++) {
      yield* generate(value.concat(arr[i]), i + 1);
    }
  })([], 0);
}
```
