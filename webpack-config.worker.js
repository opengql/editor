const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const packageJson = require('./package.json');
const babelConfig = require('./babel-config.worker.js');

const rootPath = path.resolve(__dirname, 'module', 'worker');
const sourcePath = path.resolve(rootPath, 'src');
const buildPath = path.resolve(rootPath, '..', '..', 'build');
const buildMode = process.env.NODE_ENV || 'production';
const isDev = buildMode === 'development';

module.exports = {
  entry: path.resolve(sourcePath, 'worker.js'),
  output: {
    path: path.resolve(buildPath),
    publicPath: '.',
    filename: `js/worker.bundle.js`,
  },
  mode: buildMode,
  devtool: isDev ? 'source-map' : undefined,
  target: 'webworker',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: { ...babelConfig },
        },
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['.js'],
      emitWarning: false,
      cache: false,
    }),
    new DefinePlugin({
      grammar: JSON.stringify(`{ VERSION: 'v${packageJson.version}' }`),
    }),
  ],
  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 2020,
          },
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      $worker: sourcePath,
    },
    fallback: {
      'reflect-metadata': false,
    },
  },
  stats: {
    warnings: true,
  },
  devServer: {
    static: {
      directory: path.resolve(buildPath),
    },
    compress: false,
    port: 4001,
    liveReload: true,
  },
};
