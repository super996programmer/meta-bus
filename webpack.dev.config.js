const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
});
