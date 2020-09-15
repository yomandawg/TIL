# SEO

## Open Graph Protocol

- standard metadata within a website to represent the content of a page
- customizing `meta` tags depending on the page that the user is visiting
- e.g. Twiter/FB/Linkedin _bots_ accesses(scrapes) page &harr; appropriate `meta` tags

```html
<meta property="og:type" content="website" />
<meta property="og:image" content="somestaticimg" />
<meta property="og:image:type" content="img/png" />
<!-- recommended size -->
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="company logo" />

<!-- for pages -->
<!-- key="og:title" points to the unique property -->
<!-- About -->
<meta property="og:title" content="About | NNGG" key="og:title" />
<meta property="og:url" content="about page url" key="og:url" />
<!-- Home -->
<meta property="og:title" content="Home | NNGG" key="og:title" />
<meta property="og:url" content="home page url" key="og:url" />
```

## react-helmet

- _dynamically_ set the document's head

- normal react app

  - client visits link &rarr; render Helmet tag &rarr; _Helmet_ takes new tags and manually tinkers with HTML in head tag

- SSR react app
  - client visits link &rarr; render Helmet tag &rarr; _Helmet_ loads up all the meta tags we want to show &rarr; dump Helmet tags directly into HTML template

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

- get content to users ASAP.

- `RenderToString`
  - response has the entire HTML document

```javascript
// index.js (express server)
const content = renderer(req, store, context);
...
res.send(content);
```

- `RenderToNodeStream`
  - response has a tiny snippet of HTML document
  - possible detour in response such as `Redirect`(for auth variations) or changing the status code is not possible because the response HTML is sent in pieces
  - only used when TTFB response is confident that the content won't change during application rendering process

### Meta Tags

- about 160 characters long
- contains keywords
- express value/specification
- call to action

```js
// next.js example
<Head>
  <title key="title">Home | NNGG</title>
  <meta
    name="desciption"
    key="description"
    content="This is the Home Page description"
  />
</Head>
```

### Canonical Tags

- tells search engines which url is the correct version of the page - provisional indexing
  - ex) `https://`, `http://`, `https://www`

```html
<link rel="canonical" href="the main url" key="canonical" />
```

### robots.txt

- rules on how site can be crawled
- links to `sitemap.xml`

### sitemap.xml

- informs search engines of the site structure
- provides the meta information about individual pages
- versioning(updates from the site) for the search engine crawlers

## Best Practices

- provide both `<h1>` for main content & `<title>` for title of the page
