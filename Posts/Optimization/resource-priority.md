# Browser Resource Priority

- browser will prioritize the resources and load & cache them first

## Prefetch

> high chance it will be used in the next page

```html
<link rel="prefetch" src="style.css" as="style" />
<link rel="prefetch" src="main.js" as="script" />
```

## Preload

> high chance it will be used in the current page

```html
<link rel="preload" src="style.css" as="style" />
<link rel="preload" src="main.js" as="script" />
```

#### example uses

1. preloading fonts can stop flickering
2. load something on the current page, when the user arrive at the next page, use the resource right away
