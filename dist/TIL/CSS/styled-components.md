# Styled Components

#### using custom `Link`

- since `<a>` anchor tag itself does not support some _named props_, need to create a custom wrapper component

```js
import { Link as ReactRouterDomLink } from 'react-router-dom';

const Link = ({
  isActive /* named property (unsupported as props) */,
  children,
  ...props
}) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

// make use of isActive
const StyledLink = styled(Link)`
  font-weight: ${(p) => (p.isActive ? 'bold' : 'normal')};
`;
```

```js
const Input = styled.input.attrs((props) => ({
  type: 'text',
  size: props.small ? 5 : undefined,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 1em;
  padding: ${(props) => props.padding};

  ::placeholder {
    color: palevioletred;
  }
`;
```

#### Spinner

- `keyframe` - gradual change of CSS animation

```js
const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid #f8049c;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;
```

### Theming

- `<ThemeProvider>` wrapper component provides a theme to all child components
- all child components will have access to the provided theme with `props.theme` via _context API_

```js
const [theme, setTheme] = useState(light);
return (
  // pass down the theme & setTheme via context
  <ThemeProvider
    theme={{
      ...theme,
      setTheme: () => {
        setTheme((state) => (state.id === 'light' ? dark : light));
      }
    }}
  >
  ...
)
```
