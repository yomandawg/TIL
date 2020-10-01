# Material UI

> styling component framework for React

```bash
npm install @material-ui/core
```

## Styles

> CSS-in-JS styling solution

```bash
npm i @material-ui/styles
```

### Theming

```js
export const arc = createMuiTheme({
  palette: {
    common: {},
    primary: {
      main: '',
    },
    secondary: {
      main: '',
    },
  },
  typography: {
    h3: {},
  },
});
```

### Menu

```js
<Menu
  id={label}
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  MenuListProps={{ /* handlers */ onMouseLeave: handleClose }}
>
```

### Responsive

```js
styled.div`
  ${{ ...theme.mixins.toolbar }};
  margin-bottom: 3em;

  ${theme.breakpoints.down('md')} {
    margin-bottom: 2em;
  }

  ${theme.breakpoints.down('xs')} {
    margin-bottom: 1.25em;
  }
`;
```
