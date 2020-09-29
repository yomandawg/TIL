const { merge } = require('webpack-merge');
const common = require('./webpack.base');

/**@type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',
});
