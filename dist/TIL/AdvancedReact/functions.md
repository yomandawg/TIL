# React Functions

### `React.cloneElement`

> returns a copy of a specified element

```js
React.cloneElement(element, [props], [...children]);

// equivalent to below with preserved `refs`
<element.type {...element.props} {...props}>
  {children}
</element.type>;
```

- additional props and children can be passed on
- use when a parent component wants to _add or modifiy the props_ of its children

* pattern

```js
class App extends React.Component {
  render() {
    return (
      <Parent>
        <Child />
      </Parent>
  }
}

class Parent extends React.Component {
  render() {
    let newProp = 'pass onto the child component';

    return (
      <div>
        {React.cloneElement(child, {newProp}, null)}
      </div>
    )
  }
}
```
