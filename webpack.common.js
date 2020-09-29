const path = require('path');
const fs = require('fs');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const $SECTIONS = fs.readdirSync('TIL');
const $POSTS = $SECTIONS.map((section) => {
  return { [section]: fs.readdirSync(`TIL/${section}`) };
});

/**@type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new DefinePlugin({
      $POSTS: JSON.stringify($POSTS),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, 'TIL'), to: 'TIL' }],
    }),
  ],
};
