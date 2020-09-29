# Single Page Applcation
> [참고](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)


## Client-side Rendering
> 클라이언트에서 JavaScript를 통해 View를 생성
<center><img src="https://i.pinimg.com/originals/ac/ca/0a/acca0a2e60d91ba7eef6a7967b6b7d2f.png" width="300"></center>


## Server-side Rendering
> 서버에서 HTML/View를 생성하여 응답
<center><img src="https://i.pinimg.com/originals/54/6d/f7/546df7c4b04ea9ca5f72d822ca1d23b4.png" width="300"></center>

* Benefits of SSR
  * *Better SEO*(search engine optimization), as the search engine crawls fully rendered page
  * *Faster time-to-content*, since the JavaScript codes don't need to be downloaded
* Trade-offs
  * *Development constraints*, optimizing the browser and bringing external libraries may be displeasing
  * *More involved build setup*, such as Node.js environments on the server
  * *More server-side load*, obviously.

* SSR vs Prerendering
  * Prerendering focuses on static HTML files for specific routes, rather than using a web server to compile HTML on runtime.

### Vue.js SSR
> Using a CCR framework Vue.js for SSR work can be considered a *isomorphic*(universal code) approach, in a sense that the app's code runs on both sides
* Problem with the universal code - the behavior of the code will be different in various envrironments