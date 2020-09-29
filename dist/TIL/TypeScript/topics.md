# TypeScript Topics

## Design Patterns

### Inheritance vs. Composition

- Inheritance

  - _'is a'_

- Composition
  - _'has a'_

### Composition != Multiple Inheritance

- Multiple Inheritance

```javascript
const rectangular = (state) => {
  return {
    area: () => {
      return state.height * state.width;
    },
  };
};

const openable = (state) => {
  return {
    toggleOpen: () => {
      state.open = !state.open;
    },
  };
};

const buildRectangleWindow = (state) => {
  return Object.assign(state, rectangular(state), openable(state));
};

const rectangleWindow = buildRectangleWindow({
  height: 10,
  width: 10,
  open: false,
});

rectangleWindow.open; // false
rectangleWindow.toggleOpen();
rectangleWindow.open; // true
```
