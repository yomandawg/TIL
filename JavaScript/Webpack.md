# Webpack
> Get multiple source files and bundle them together as a single file

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

---

# Modern JavaScript

## Installation
```bash
npm install webpack webpack-cli --save-dev # install
node_modules/.bin/webpack # execution => to compressed js
```

## Setting
```javascript
// webpack.config.js
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'bundle.js'
  }
};
```
* `__dirname`: absolute relative path of the project
```json
// @package.json npm automation
"scripts": {
    "babel": "node_modules/.bin/babel src/index.js -w -o dist/assets/bundle.js",
    "webpack": "node_modules/.bin/webpack"
    // "webpack": "node_modules/.bin/webpack -w" for watch
  },
```

## import/export
### Named
```javascript
// @index.js
import './dom'; // shortening of './dom.js'

// a function from `dom.js`
addTitle('test'); // => err!
// `import` runs the file but not shares any variables or functions
```
```javascript
// @dom.js
// export keyword to share things
export const styleBody => {
  // do something
};
export const addTitle = (text) => {
  // do something
};

// or
export { styleBody, addTitle };

// @index.js
import { styleBody, addTitle } from './dom'; // specific import to use them
```

### Default
```javascript
// @data.js
const users = [
  // something
];
export default users // there's only one default per file

export { getPremUsers, users as default }; // alternative way

// @index.js
import yo from './data'; // import `default`

import yo, { getPremUsers } from './data'; // along with `named` exports
```


## webpack-dev
* `npm install webpack-dev-server --save-dev`
* webpack dev server automatically watches for changes
  * don't need the `-w` flag
  * however, the physical code is not manifested to `bundle.js`
  * instead, webpack runs the changes on memory, which speeds up webpack-dev-server
  * webpack-dev-server actually serves virtual files from assets

### Setting
```json
// @package.json
"scripts": {
    ...
    "build": "node_modules/.bin/webpack --mode production", // for building in 'production' mode
    "serve": "webpack-dev-server --mode development" // take it as the 'live server' in 'development' mode
  },
```
```javascript
// @webpack.config.js
module.exports = {
  ...
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // serving to the browser
    publicPath: '/assets/' // where the assets are
    // it doesn't serve the physical files
    // instead, actually serve virtual files that is stored in memory
    // and uses this file path to serve them
    // since this is the file path that we linked to in the index.html file.
    // this speeds up webpack-dev server since it doesn't manually write
    // a new file to dist folder every time we make a change
  }
};
```

### Develop vs. Production Mode
* **Develop** - webpack processes faster but not optimized
* **Production** - slower but more efficient and smaller in size


## Loaders
> tasks for webpack\
### Babel
* `npm install babel-loader --save-dev`
```javascript
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};
```