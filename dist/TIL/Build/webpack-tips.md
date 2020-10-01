### TIps

- loader chain is executed in reverse order

#### webpack-manifest-plugin

- custom management on output and mapping assets to bundles

#### source maps without webpack overheads

```js
// enable source map
mode: 'development',
devtool: 'inline-source-map',
```

#### webpack-dev-middleware

- publicPath(absolute serve path from the server) setup

```js
publicPath: '/' /**serve files correctly from 3000(server) */,
```

- express server

```js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
```

#### Polling

```js
module.exports = {
  watchOptions: {
    poll: 1000,
  },
};
```
