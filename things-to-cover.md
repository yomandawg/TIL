1. keys in lists
  * render *only* the new DOM objects

2. order of loading
   * callbacks on image load
```javascript
this.imageRef.current.addEventListener('load', this.setSpans);
```

3. `preventDefault`

4. reducer-state relationship

5. action creator inside a action creator

6. `gapi.load`

7. redux-form `validate` and `meta` binding

8. array-based reducer vs. object-based reducer

9. intentional navigation vs. programmatic navigation
  - not very easy to handle `history` object

13. dropdown component problems (hooks) with event bubbling
  - stopping event bubbling is possible (how?) - not a good practice

1.  `useEffect` second array argument reference and state update rerender problem - debouncing with two `useEffect`

2.  why use hook instead of class? - benchmark?
```
Hooks are for functional components to give them features that previously only class components could access, such as state, contexts, and so on. People used to writing functional components can keep using them that way without having to convert them to a class. Since the entire component is still just a single function, it’s possible to pull off advanced tricks using functional programming techniques to manipulate the components.

Functional components (and the hooks that go with them) just give you a different way to organize your code, a way that some programmers find more intuitive than classes.
```

* `Provider` vs `Consumer` in context

* redux vs context

* separating business logic in a context system



---


## SSR

* loadData on client side (for SPA, request to API twice is unnecessary?)

* `RenderToString` vs. `RenderToNodeStream`