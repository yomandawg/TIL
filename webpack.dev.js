const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**@type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port: 5000,
    open: true,
    hot: true,
  },
});
