const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const common = require('./webpack.common');

/**@type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [new CleanWebpackPlugin(), new ManifestPlugin()],
});
