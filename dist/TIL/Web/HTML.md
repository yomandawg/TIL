# HTML

```html
// `target="_blank"` opens a new window on click
<a href="url" target="_blank"></a>
```

```html
<form action="target">
  <input type="text" name="temp" /> // sends the name="temp" inside `req.body`
  <input type="submit" /> // sends the action="target"
</form>
```

```html
// select tag with option tag
<select name="variable">
  <option value="1">1</option>
  <option value="2">2</option>
</select>
```

- anchor tags (`<a href="/route">`) make a brand new request - not suitable for SPA
  - all related HTML/CSS/JS data will be dumped; resource waste

### Event Bubbling

- a way to detect a click event on any element besides one it created
- set up a manual event listener on the body element => a click on any element will bubble up to the body

```javascript
document.body.addEventListener('click', () => console.log('click!'));
```

## Tags

- `<template>`
  - not to be rendered immediately on load, but instantiated during runtime using JavaScript

## data-\* attributes

```html
<ul>
  <li data-animal-type="bird">Owl</li>
  <li data-animal-type="fish">Salmon</li>
  <li data-animal-type="spider">Tarantula</li>
</ul>
```

- used to store custom data private to the page or application
- gives the ability to embed custom data attributes on all HTML elements

* use it for SPA with `preventDefault`

```html
<a href="/settings" class="nav__link" data-link>settings</a>
```

```js
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    hitory.pushState(null, null, e.target.href);
  }
});
```
