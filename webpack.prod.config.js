const { merge } = require('webpack-merge');

const { ESBuildMinifyPlugin } = require('esbuild-loader');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
});
