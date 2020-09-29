# Higher Order Components

> A React component made for code reuse

- Component + HOC = Enhanced Component with additional functionality

* Redux `connect` & Apollo `graphql` is a HOC

```js
export default (ChildComponent) => {
  class ComposedComponent extends Component {
    additionalFunctionality() {
      // do something
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { someState: state.someState };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
```

- props pass down to nested Components with `{...this.props}`

|   hierarchy    | props pass down |
| :------------: | :-------------: |
|      App       |                 |
|     Route      | history &darr;  |
|    connect     | actions &darr;  |
| additional HOC |                 |
|   Component    |                 |
