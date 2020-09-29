# display

### inline

```css
span.inline {
  /* default dispaly for `span` */
  display: inline;

  /* width & height properties are not treated */
  width: 100px;
  height: 100px;

  /* padding absolute with top and bottom */
  padding: 100px;
}
```

### inline-block

```css
span.inline-block {
  /* treated as a block tag but inline */
  display: inline-block;

  /* width, height and padding all properly treated */
  width: 100px;
  height: 100px;
  padding: 100px;
}
```

### block

```css
span.block {
  /* all elements are blocks with newline */
  display: block;
  width: 100px;
  height: 100px;
  padding: 100px;
}
```
