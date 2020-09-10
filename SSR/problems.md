# SSR Problems

## FOUC

- page needs to be loaded with the required CSS from the server, otherwise the page will wait for the CSS to be injected by the client, causing it to flicker (FOUC).

* injecting the CSS(style) from the server-side CSS before the client side CSS
  - create a new stylesheet instance (`ServerStyleSheet`) for every request
  - render the react tree on server-side
  - pull the css out
  - pass the css to the client
