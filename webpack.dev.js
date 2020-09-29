const { merge } = require('webpack-merge');
const common = require('./webpack.common');

/**@type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    port: 5000,
    open: true,
    hot: true,
  },
  devtool: 'inline-source-map',
});
