# Advanced Javascript

## Proxy

- the wrapper which can intercept and redefine the operations for the given object

```ts
new Proxy(target: {}, handler: ProxyHandler(<{}>) => {})
```

- `target` - the original object
- `handler` - the object that defines which operations will be intercepted (redefined)
  - action &rarr; target directly if no handler is present
  - traps methods
    - `get`, `set`, `deleteProperty`, `ownKeys`...

```js
let user = {
  name: 'Yoman',
  getName: function () {
    return this.name;
  },
};

user = new Proxy(user, {
  get(target, prop) {
    let value = target[prop];
    return typeof value === 'function' ? value.bind(target) : value;
  },

  set(target, prop, val) {
    target[prop] = val;
    return true;
  },

  deleteProperty(target, prop) {
    delete target[prop];
    return true;
  },

  ownKeys(target) {
    // intercept iteration
    return Object.keys(target);
  },
});
```
