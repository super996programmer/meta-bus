const custom = require('../webpack.config.js');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ProvidePlugin } = require('webpack');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: ['.tsx', '.ts', '.js', '.json'],
      }),
    ];

    config.plugins = [
      ...(config.plugins || []),
      new ProvidePlugin({
        React: 'react',
      }),
    ]

    return { ...config, module: { ...config.module, rules: custom.module.rules } };
  },
}