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

## fetch

- `referrer` - set `Referer` header

  - `""` - no `Referer`

- `mode` - safeguard for cross-origin requests
  - `cors` - default
  - `same-origin` - cross-origin is forbidden
  - `no-cors` - simple cross-origin requests (GET/POST) allowed
- `credentials` - how to handle cookies

  - `same-origin` - default (no cookies sent by cross-origin requests)
  - `include` - always send (requires `Accept-Control-Allow-Credentials: true` from the server for JS to access the response)

- `cache` - http-caching strategy
  - `default` - standard rules
  - `no-store` - no http-cache
  - `no-cache` - conditional request to check if the cached response is stale
  - `force-cache` - allow stale cache, if no cache &rarr; request
  - `only-if-cached` - allow stale cache, if no cache &rarr; error
- `keepalive` - request may outlive the page
  - e.g. server gathers statistics about the visitor &rarr; visitor leaves the page &rarr; send the data to the server
  - `keep-alive` tells the browser to request in the background even when all network requests are aborted

```js
// keepalive example
window.onunload = function () {
  fetch('/analytics', {
    method: 'POST',
    body: 'statistics', // payload
    keepalive: true,
  });
};
```

### fetch abort

```js
let controller = new AbortController(); // abort controller
let signal = controller.signal; // connection signal

signal.addEventListener('abort', () => console.log('abort'));

controller.abort(); // controller abort

console.log(signal.aborted); // true when aborted
```

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal, // fetch lisntens to controller abort events
});
```

- abort in 1 second example

```js
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

fetch('/article/fetch-abort/demo/hang', {
  signal: controller.signal,
})
  .then((res) => {
    // do something
  })
  .catch((err) => {
    if (err.name == 'AbortError') {
      // handle abort
    }
  });
```
