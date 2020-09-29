# Modern CSS

## CSS Module

> a build setup (webpack) addition for scoped CSS - compiled to an interoperable CSS format

```css
/* myComponent.module.css */
.page {
  background: yellow;
}
.page h1 {
  color: red;
}
.text {
  text-transform: uppercase;
}
```

- returns a CSS container object containing unique selector

```js
const styles = {
  page: 'product-module--page---IRWm',
  text: 'product-module--text--12x9y',
};
```

```js
import styles /* the CSS object */ from 'css/myComponent.module.css';

const blog = () => {
  return (
    <div className={styles.page}>
      <h1>this will be red</h1>
      <p className={styles.text}>this will be uppercase</p>
    </div>
  );
};
```

- `composes` propclasseserties from other modules

```css
.otherClass {
  composes: className from './otherModule.css';
}
```

## Style Components

> CSS-in-JS for React components

```bash
npm i styled-components
```

```js
const Button = styled.button`
  font-size: 1em;
`;
// style inherit
const BlueButton = styled(Button).h1`
  color: blue;
`;
// can use template literals
const Wrapper = styled.section`
  background: ${(props) => (props.color ? 'white' : 'black')};
`;

// use CSS components with JSX
render(
  <Wrapper>
    <BlueButton>Submit</BlueButton>
  </Wrapper>
);
```

```js
const Component = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const StyledComponent = styled(Component)`CSS`;

render(
  <>
    <StyleComponent>
      <ChildComponent />
    </StyledComponent>
  </>
);
```
