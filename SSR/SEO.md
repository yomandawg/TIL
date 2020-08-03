# SEO

## Open Graph Protocol
* standard metadata within a website to represent the content of a page
* customizing `meta` tags depending on the page that the user is visiting
* e.g. Twiter/FB/Linkedin *bots* accesses(scrapes) page &harr; appropriate `meta` tags


## react-helmet
* *dynamically* set the document's head

* normal react app
  - client visits link &rarr; render Helmet tag &rarr; *Helmet* takes new tags and manually tinkers with HTML in head tag

* SSR react app
  - client visits link &rarr; render Helmet tag &rarr; *Helmet* loads up all the meta tags we want to show &rarr; dump Helmet tags directly into HTML template
```javascript
// some page
render() {
  // `<Helmet>` inspects the tags and internalize these tags
  // then in helpers, extract the tags out and output it in the HTML template
  return (
    <div>
      <Helmet>
        <title>Users App</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
      ...
    </div>
  )
}
```
```javascript
// helpers/renderer.js
export default (req, store, context) => {
  ...
  const helmet = Helmet.renderStatic();

  // dynamically return head tags
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ...
```


### TTFB
> time-to-first-byte\

* get content to users ASAP.

* `RenderToString`
  * response has the entire HTML document
```javascript
// index.js (express server)
const content = renderer(req, store, context);
...
res.send(content);
```

* `RenderToNodeStream`
  * response has a tiny snippet of HTML document
  * possible detour in response such as `Redirect`(for auth variations) or changing the status code is not possible because the response HTML is sent in pieces
  * only used when TTFB response is confident that the content won't change during application rendering process