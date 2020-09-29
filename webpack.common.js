const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const fs = require('fs');

const $SECTIONS = fs.readdirSync('./Posts');
const $POSTS = $SECTIONS.map((section) => {
  return { [section]: fs.readdirSync(`./Posts/${section}`) };
});

/**@type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(png|jpe?g|gif|md)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
    }),
    new DefinePlugin({
      $SECTIONS: JSON.stringify($SECTIONS),
      $POSTS: JSON.stringify($POSTS),
    }),
  ],
};
