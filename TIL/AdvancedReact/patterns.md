# React Patterns

### Refs with EventListener

- referencing the render-finished image

```js
function myComponent(props) {
  const imageRef = React.createRef();

  // componentDidMount
  useEffect(() => {
    // accessing the render-finished image
    imageRef.current.addEventListener('load', () => {
      console.log(imageRef.current.clientHeight);
    });
  });

  return (
    <div>
      <img ref={imageRef} />
    </div>
  );
}
```
