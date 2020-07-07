# HTML

```html
// `target="_blank"` opens a new window on click
<a href="url" target="_blank">
```
```html
<form action="target"> 
  <input type="text" name="temp"> // sends the name="temp" inside `req.body`
  <input type="submit"> // sends the action="target"
</form>
```
```html
// select tag with option tag
<select name="variable">
  <option value="1">1</option>
  <option value="2">2</option>
</select>
```

* anchor tags (`<a href="/route">`) make a brand new request - not suitable for SPA
  - all related HTML/CSS/JS data will be dumped; resource waste