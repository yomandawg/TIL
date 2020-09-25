# Webpack Development Process

## Introduction

- setup

```
npm install --save-dev webpack webpack-cli
```

- `package.json` - default setup

```json
{
  "private": true, // do not publish the app
  "scripts": {
    "start": "webpack"
  }
}
```

```bash
npm start
...
ERROR in Entry module not found: Error: Can't resolve './src' in 'C:\...'
```

- need to provide a default directory or `src/app/index.js` file

- `src/app/index.js` - the default _to-be-bundled_ file

```javascript
alert('show this message');
```

```bash
npm start
...
Entrypoint main = main.js
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
```

- notice `dist/main.js`(_the distribution file_) has been created
- the `dist/main.js` is the ditribution file that has bundled all the javascript codes from `src/app/index.js` that are integrated _in order_

- `./index.html` - html entry

```html
<html>
  ...
  <script src="./dist/main.js"></script>
</html>
```

- when browsing the `./index.html` the wrapped `src/app/index.js` will be executed by `dist/main.js`

## Basic Configuration

> configuration setting in `webpack.config.js`

- set config file

```json
// package.json
{
  "scripts": {
    "start": "webpack --config webpack.config.json" // set config file
  }
}
```

- **default mode** (production)

```javascript
// webpack.config.js
const path = require('path');
module.exports = {
  // the to-be-bundled JS file
  entry: './src/index.js',
  // make a bundled file `C:/.../webpack-demo-app/[dist]/[main.js]`
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

- **development mode**

```javascript
// webpack.config.js
module.exports = {
  // set mode to development
  mode: 'development',
};
```

- the production mode bundles the file without obfuscation - easier to debug

- `devtool` controls the `eval` codes

```javascript
module.exports = {
  devtool: 'none',
};
```

## Loaders

> pre-process with certain rules

### CSS-Loader & Style-Loader

```bash
npm install --save-dev style-loader css-loader
```

- `css-loader` turns _CSS_ to valid _JS_
- `style-loader` adds CSS(from valid JS) to the DOM by injecting a `<style>` tag

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // regEx: end with `.css`
        use: [
          'style-loader', // 2. Inject styles into DOM
          'css-loader', // 1. CSS to common JS
        ],
      },
    ],
  },
};
```

- **order**: `css-loader` &rarr; `style-loader`; `Array.pop`

### SASS-Loader

- `css-loader` not compatible with `/\.scss$/`; _SASS(SCSS)_ needs to be compiled to be _CSS_

```bash
npm install --save-dev sass-loader node-sass
```

```javascript
// webpack.config.js
test: /\.scss$/,
use: [
  "style-loader", // 3. Inject styles into DOM
  "css-loader", // 2. CSS to common JS
  "sass-loader" // 1. SASS to CSS
]
```

### HTML-Loader

- exports HTML as string (minimized) to javascript

```bash
npm install --save-dev html-loader
```

- use `html-loader`

```javascript
// webpack.common.js
module: {
  rules: [
    {
      test: /\.html$/, // regEx: end with `.html`
      use: ["html-loader"]
    }
  ],
},
```

```bash
npm run build # cause error
```

- error causes
  1. `html-loader` processes through the `html` file and converts it into valid javascript code
  2. `<img src="./assets/webpack.svg"/>` is converted into `require("./assets/webpack.svg")`, however the `svg` file cannot be apropriately processed

### File-Loader

- resolves `import`/`require` on a file into a url and emits the file into the output directory

```bash
npm install --save-dev file-loader
```

- use `file-loader`

```javascript
{
  test: /\.(svg|png|jpg|gif)$/, // regEx: end with `.svg` or `.png` or `.jpg` or `.gif`
  use: {
    loader: "file-loader",
    options: {
      name: "[name].[hash].[ext]", // emit the file (hashed for cache busting)
      outputPath: "imgs" // configure path to emit into
    }
  }
}
```

## Cache Busting

> prevent browsers from caching bundled files (prevent `served from disk cache`)

- user might use older version of distributed files when cached

- new hashed (_md5_ algorithm) filename on code change - `[contentHash]`

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: 'main.[contentHash].js', // hashed filename
  },
};
```

- **tips**
  - `vendor.js` for unchanged library files for caching
  - `[contentHash].js` for capricious application files

## Plugins

> additional functionality to Webpack

### html-webpack-plugin

> helper for html generation

```bash
npm install --save-dev html-webpack-plugin
```

- link dynamic filename to _HTML_

```javascript
// webpack.config.js
module.exports = {
  plugins: [new HtmlWebpackPlugin()],
};
```

```bash
npm start
```

- notice the _minimal_ `dist/index.html` has been generated by `HtmlWebpackPlugin`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <!-- the script has automatically been inserted -->
    <script src="main.ac07152a66a64c6d63e4.js"></script>
  </body>
</html>
```

- provide a template(`./src/template.html`) for `HtmlWebpackPlugin`

```javascript
// webpack.config.js
plugins: [new HtmlWebpackPlugin({
  template: "./src/template.html"
})],
```

- provide a js-template(`./src/template.js`)

```js
new HtmlWebpackPlugin({
  title: 'Hello world',
  template: 'src/template.js',
  filename: 'subfolder/custom_filename.html',
  meta: { description: 'Some description' },
});
```

```js
// src/template.js
export default ({ htmlWebpackPlugin }) =>
  `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${htmlWebpackPlugin.options.title}</title>
    </head>
    <body></body>
  </html>`;
```

### clean-webpack-plugin

> clean up `dist` on building

```bash
npm install --save-dev clean-webpack-plugin
```

```javascript
// webpack.prod.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [new CleanWebpackPlugin()],
});
```

## Multi-Configurations

- manage multi configuration files for multipurpose

### Common

- `webpack.common.js`

```javascript
module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

- include the functionality from `webpack.common.js`

```bash
npm install --save-dev webpack-merge
```

- easily merge config files by `webpack-merge`

```javascript
// webpack.dev.js
const common = require('./webpack.common');
const { merge } = require('webpack-merge'); // import merge function

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
});
```

```javascript
// webpack.prod.js
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
```

- set different modes in npm settings

```json
// package.json
"scripts": {
    "start": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```

```bash
npm start # development mode
npm run build # production build
```

### Webpack Dev Server

> build automation

```bash
npm install --save-dev webpack-dev-server
```

- dev-server setup

```js
devServer: {
  contentBase: path.resolve(__dirname, 'dist') /**serve content from... */,
  index: 'index.html',
  port: 9000,
}
```

```json
"scripts": {
  "start": "webpack-dev-server --config webpack.dev.js",
}
```

- automatically open the browser with `--open` option
- inject new versions of the files at runtime with `--hot`(hot-reloading; keeping the state) option

```json
"start": "webpack-dev-server --config webpack.dev.js --hot --open",
```

- code changes now automatically rebuilds and live-updates the rendered page
- the dev-server is run on memory; doesn't create any files

## Multiple Entrypoints

```javascript
// webpack.common.js
module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js
  }
  ...
```

```javascript
// webpack.prod.js
module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    ...
```

```javascript
// webpack.dev.js
module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    ...
```

- use `vendor.js` for library imports
  - webpack will only freshly bundle changed codes (allows caching of `vendor.js`)

```js
mode:
  'development' /** sets process.env.NODE_ENV === 'production' on DefinePlugin - enables 'source map' for debugging */,
devServer: {
  contentBase: path.resolve(
    __dirname,
    'dist'
  ) /**serve content from...; the actual files are served from the memory */,
  index: 'hello.html' /**specifies the index entry of the server */,
  port: 9000,
},

...

new HtmlWebpackPlugin({
  filename: 'hello.html',
  chunks: ['hello'] /**specifies which bundle to include in this HTML */,
  title: 'Hello Page',
  meta: { description: 'hello page' },
  template: 'src/hello-template.js',
}) /**dynamically create HTML files */,
new HtmlWebpackPlugin({
  filename: 'sample.html',
  chunks: ['sample'] /**specifies which bundle to include in this HTML */,
  title: 'Sample Page',
  description: 'sample page',
  template: 'src/sample-template.js',
}) /**multiple HTML files */,
```

## Extracting CSS

- standalone CSS rendering is faster than converted javascript codes

```bash
npm install --save-dev mini-css-extract-plugin
```

- configuration

```javascript
// webpack.common.js
module.exports = {
  module: {
    rules: [
      /* remove CSS rules
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
      */
      ...
```

```javascript
// webpack.dev.js
module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
      ...
```

```javascript
// webpack.prod.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
  plugins: [
    // use MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: "[name].[contentHash].css" // emit CSS file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader /**extracts CSS into separate files; create a CSS file per JS file, supporting on-demand-loading(async) of CSS */,
          'css-loader' /**interprets @import and url() like import/require() and resolve them */,
          'sass-loader' /**transpiles Sass/SCSS to CSS */,
        ],
      }
    ]
    ...
```

## Minify HTML/JS/CSS

### optimize-css-assets-webpack-plugin

> minify CSS size for production

```bash
npm install --save-dev optimize-css-assets-webpack-plugin
```

```javascript
// webpack.prod.js
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = merge(common, {
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  ...
```

- _problem_: CSS is optimized but JS is back to normal
  - _default optimization mode is for JS_ so explicit use of `minimizer` will _override_ it

```javascript
// webpack.prod.js
const TerserPlugin = require("terser-webpack-plugin"); // default plugin for JS optimization
...
optimization: {
  minimizer: [
    new OptimizeCssAssetsPlugin(),
    new TerserPlugin()
  ]
},
```

### HtmlWebpackPlugin - minify option

- change the `webpack.common.js` to not minify the development version

```javascript
// webpack.common.js
/* remove
plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
*/
```

```javascript
// webpack.dev.js
module.exports = merge(common, {
  // add the plugin here for unaffected dev mode
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
```

```javascript
// webpack.prod.js
optimization: {
  minimizer: [
    // add the minimizer
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    })
    ...
```

---

### DefinePlugin

- `DefinePlugin` allows you to create global contants which can be configured at _compile_ time

```js
mode: 'none';
mode: 'development'; /// sets process.env.NODE_ENV === 'production' on DefinePlugin
mode: 'production'; // sets process.env.NODE_ENV === 'development' on DefinePlugin
```

- `mode: 'development'`
  - uses source map for debuggable scripts
- **source map**
  - maps built files(`/dist`) to original sources(`/src`)
  - map combined/minified file back to an unbuilt state

### dependency optimization

- optimize redundant dependencies

```js
optimization: {
  splitChunks: {
    chunks: 'all',
  } /**common chunks strategies for imported modules - emits into the vendor file */,
},
...
new HtmlWebpackPlugin({
  filename: 'hello.html',
  chunks: [
    'hello',
    'vendors~hello~sample' /**need to specify the vendor bundle to include */,
  ] /**specifies which bundle to include in this HTML */,
  title: 'Hello Page',
  meta: { description: 'hello page' },
  template: 'src/hello-template.js',
}) /**dynamically create HTML files */,
```

### Font module with file-loader

```js
{
  test: /\.(woff2|woff|ttf)$/,
  use: {
    loader:
      'file-loader' /**resolves import/require() on a file into a url -> emits the file into the output directory */,
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/',
    },
  },
}
```

### Intellisense Autocomplete for Webpack Config Files

- use TypeScript definition

```js
/**@type {import('webpack').Configuration} */
module.exports = {
  ...
}
```
