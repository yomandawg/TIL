# Cross Browser Support

- Safari does not render a `<text>` tag inside of an image tag

```html
<!-- svg file contains <text> tag inside - problem -->
<img alt="svg-image" src="/assets/image.svg" />

<!-- use svg directly -->
<svg ... />
```
