# Webpack

## Bundler
* 파일 충돌 방지
* **module** - XML namespace (`xmlns`)와 비슷한 개념

```javascript
// index.html
<script type="module">
    import hello_word from "./source/hello.js" // hello.js의 word
    import world_word from "./source/world.js" // world.js의 word
</script>

// hello.js
var word = "Hello";
export default word;

// world.js
var word = "World";
export default word;
```

## Package.json
> `npm init` - 현재 directory를 node.js project로 선언
* 프로젝터 정보 파일
* `devDependencies`

* `npm install -D webpack webpack-cli`
  * `-D` - 개발용

* `npx` - 프로젝트 안의 package execute

## bundling
* `npx webpack --entry ./source/index.js --output ./public/index_bundle.js`
* `npx webpack --config webpack.config.js`
* `npx webpack --watch`

### Development
> `mode: 'development'`

### Production 
> `mode: 'production'`


## Loader
> JavaScript 외의 파일들까지 bundling
* Asset Management
  * static files
  * `npm install --save-dev style-loader css-loader`

## Plugin
* `HtmlWebpackPlugin` - simplifies creation of HTML files to serve webpack bundles