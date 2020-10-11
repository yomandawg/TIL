## Browser Events

- `EventTarget.addEventListener(type, listener [, options])`

* `hashchange` - triggered when the part of the _URL's fragment_(URL beginning with `#`) has changed

## window.location

- `Location.hash: string` - _URL's fragment_ (beginning with `#`)

## URLSearchParams

- provide utility methods to work with the query string

```js
var searchParams = new URLSearchParams('q=URLUtils.searchParams&topic=api');
searchParams.append('method', 'flickr.interestingness.getList');
searchParams.append('api_key', '');

for (let [key, value] of searchParams) {
  console.log(key, value);
}
```

```js
var url2 = new URL('http://example.com/search?query=%40');
var searchParams2 = new URLSearchParams(url2.search); // [query, %40]
```

## Blob

- file-like object of _immutable, raw data_
- Blob = type + blobParts (_binary data with type_)
- store binary objects such as images

```js
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
// new blob(blobParts, options);
let blob = new Blob([hello, ' ', 'world'], { type: 'text/plain' });

blob.text().then((res) => console.log(res)); // Hello world
```

## URL.createObjectURL

- creates a string URL _representing the given object_
- the URL lifetime is related to the `document` on which it was created
- the object URL represents the specified `File/Blob`

```html
<a download="hello.txt" href="#" id="link">Download</a>
<script>
  let blob = new Blob(['hello world'], { type: 'text/plain' });
  link.href = URL.createObjectURL(blob); // download the dynamically generated blob
  URL.revokeObjectURL(link.href); // extinguish the used object URL
</script>
```

## Proxy & Reflect

## Cache
