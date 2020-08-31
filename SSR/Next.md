# Next.js

> React framework for pre-rendered Apps (SSR)

## SSR

> HTML/View from the server\

<center><img src="https://i.pinimg.com/originals/54/6d/f7/546df7c4b04ea9ca5f72d822ca1d23b4.png" width="300"></center>

- Benefits
  - _Better SEO_, as the search engine crawls fully rendered page
  - _Faster time-to-content_, since the JavaScript codes don't need to be downloaded
- Trade-offs
  - _Development constraints_, optimizing the browser and bringing external libraries is challenging
  - _Difficult build setup_, such as Node.js environments on the server
  - _More server-side load_
- SSR vs Prerendering
  - Prerendering focuses on static HTML files for specific routes, rather than using a web server to compile HTML on runtime.
