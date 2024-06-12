const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');
const babelConfig = require('./babel-config.worker.js');
const packageJson = require('./package.json');
const jsConfig = require('./jsconfig.json');

const rootPath = path.resolve(__dirname, 'module', 'worker');
const sourcePath = path.resolve(rootPath, 'src');
const buildPath = path.resolve(rootPath, '..', '..', 'build');
const buildMode = process.env.NODE_ENV || 'production';
const isDev = buildMode === 'development';

const getResolveAliasFromJsConfig = () => {
  return Object.entries(jsConfig.compilerOptions.paths).reduce((acc, [key, value]) => {
    const transformedKey = key.replace('/*', '');
    const paths = path.resolve(__dirname, value[0].replace('/*', ''));
    return { ...acc, [transformedKey]: paths };
  }, {});
};

module.exports = {
  entry: path.resolve(sourcePath, 'worker.js'),
  output: {
    path: path.resolve(buildPath),
    filename: `js/[name].worker.bundle.js`,
    chunkFilename: `js/[name].worker.bundle.chunk.js`,
    assetModuleFilename: `media/[name].worker.[hash][ext]`,
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
      grammar: {
        VERSION: `'v${packageJson.grammarVersion}'`,
      },
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 2048000,
    maxAssetSize: 512000,
  },
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
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      maxSize: 2000000,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          priority: -10,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  resolve: {
    alias: getResolveAliasFromJsConfig(),
    extensions: ['.js'],
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
