const MiniCssExtractorPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const rootPath = path.resolve(__dirname, 'module', 'editor');
const sourcePath = path.resolve(rootPath, 'src');
const buildPath = path.resolve(__dirname, 'build');
const publicPath = path.resolve(rootPath, 'public');
const buildMode = process.env.NODE_ENV || 'production';
const isDev = buildMode === 'development';

const styleLoader = isDev ? require.resolve('style-loader') : MiniCssExtractorPlugin.loader;

module.exports = {
  entry: path.resolve(sourcePath, 'index.jsx'),
  output: {
    path: path.resolve(buildPath),
    // publicPath: '.',
    filename: `js/[name].bundle.js`,
    chunkFilename: `js/[name].bundle.chunk.js`,
    assetModuleFilename: `media/[name].[hash][ext]`,
  },
  mode: buildMode,
  devtool: isDev ? 'source-map' : undefined,
  target: 'browserslist',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [styleLoader, require.resolve('css-loader')],
      },
      {
        test: /\.module\.css$/,
        use: [
          styleLoader,
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: 'am-[local]-[hash:base64:5]',
                localIdentContext: path.resolve(sourcePath),
                exportLocalsConvention: 'camelCase',
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [require.resolve('file-loader')],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx'],
      emitWarning: false,
      cache: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(publicPath, 'index.html'),
      inject: true,
    }),
    new MiniCssExtractorPlugin({
      filename: `css/editor.[contenthash:8].css`,
      chunkFilename: `css/editor.[contenthash:8].chunk.css`,
    }),
    // new StylelintPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'module/editor/public/font',
          to: 'font',
        },
        {
          from: 'module/editor/public/css',
          to: 'css',
        },
      ],
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
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      minChunks: 4,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          priority: -10,
          enforce: true,
          reuseExistingChunk: true,
        },
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          priority: -40,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      'reflect-metadata': false,
    },
  },
  stats: {
    warnings: true,
  },
  devServer: {
    static: [path.resolve(buildPath), path.resolve(publicPath)],
    compress: false,
    port: 4000,
    liveReload: true,
    hot: true,
  },
};
