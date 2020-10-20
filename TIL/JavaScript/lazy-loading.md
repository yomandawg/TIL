# Lazy Loading

- images account for over 60% of the page weight!
- `IntersectionObserver`

## LQIP - Low Quality Image Placeholders

- make images as small as possible &rarr; high resolution quality images needed &rarr; situational performance issue &rarr; LQIP

- prevent shifting layouts from the DOM layout operations (disorienting and also very expensive)

- `<img>`'s src initially points to LQIP &rarr; `IntersectionObserver` &rarr; update to the final image URL

### Implementation of LQIP

1. server prepares LQIP
2. client loads LQIP
3. client loads high quality images
   1. JS iterates all image tags with high quality src
   2. create a hidden `<img>` tag with high quality src
   3. swap this tag with the old one (swapping will prevent flickering)
   4. call this function on `onload`

## Image decoding delays

- large images to the DOM &rarr; need to be decoded &rarr; heavy operation for the main thread

```ts
HTMLImageElement.decode(): Promise<void>
```

```js
const img = new Image();
img.src = 'large_image.jpg';

if ('decode' in img) {
  img.decode().then(() => imageContainer.appendChild(img));
} else {
  // for unsupported browsers
  imageContainer.appendChild(img);
}
```

- handling errors
  - e.g. stale image &rarr; redeployment &rarr; hash-version changed, cannot load image

```js
let image = new Image();
image.src = 'might-be-stale.jpg';

image.onerror = function () {
  // handle error
};
image.onload = function () {
  // load image
};
```

- handle `<noscript>`

```html
<img src="placeholder-lqip.jpg" data-src="lazy-load.jpg" />
<noscript>
  <img src="lazy-load.jpg" />
</noscript>
```

---

## Intersection Observer

```js
const observer = new IntersectionObserver(callback, options);
document.querySelectorAll('.img').forEach((imgElement) => {
  observer.observe(imgElement);
});
```

- loading from `data-src` attribute

```js
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.tagName === 'IMG') {
      let imgSrc = entry.target.getAttribute('data-src');
      if (imgSrc) {
        entry.target.src = imgSrc;
      }
      observer.unobserve(entry.target);
    }
  });
};
```

- replacing a LQIP

```js
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.tagName === 'IMG') {
      entry.target.src = entry.target.src.replace('size=100', 'size=1000');
      observer.unobserve(entry.target);
    }
  });
};
```

## Scroll Event

```js
window.addEventListener('scroll', () => {
  // document height - window height = scrollable height
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (Math.ceil(scrolled) === scrollable) {
    console.log('bottom');
  }
});
```
