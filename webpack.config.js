const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { ProvidePlugin } = require('webpack');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: { index: './src/index.tsx' },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.tsx', '.ts', '.js', '.json'],
        baseUrl: path.resolve(__dirname),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
      {
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'css',
              minify: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: [path.resolve(__dirname, 'content', 'img')],
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ProvidePlugin({
      React: 'react',
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'js'],
    }),
    new StylelintPlugin({
      extensions: ['.css', 'tsx'],
    }),
    new WebpackBar(),
  ],
};
