const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const {
  __PROD__,
  __DEV__,
  frontendBuiltPath,
  backendBuiltPath,
  srcPath,
  frontendSrcPath,
  backendSrcPath,
  endpoint,
} = require('./environment');

const extract = __DEV__ ? ({ fallback, use }) => [fallback, ...use] : ExtractTextPlugin.extract;
const compact = arr => arr.filter(v => v !== false);
const svgo = {
  plugins: [{ removeUnknownsAndDefaults: false }]
};
const babel = {
  loader: 'babel-loader',
  options: {
    retainLines: true,
    cacheDirectory: __DEV__,
  },
};

const alias = {
  '/environment': path.resolve(__dirname, 'environment.js'),
};
fs.readdirSync(frontendSrcPath).forEach(name => {
  alias['/' + name] = path.resolve(frontendSrcPath, name);
});

//process.traceDeprecation = true;

module.exports = {
  name: 'frontend',
  target: 'web',
  devtool: __DEV__ && 'inline-eval-cheap-source-map',
  entry: compact([
    __PROD__ && 'babel-polyfill',
    __DEV__ && 'webpack-hot-middleware/client',
    frontendSrcPath,
  ]),
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.jsx', '.js', '.scss'],
    alias,
  },
  output: {
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    path: frontendBuiltPath,
    publicPath: '/',
  },
  plugins: [
    ...(
      __DEV__ ? [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
      ] : [
        new CleanWebpackPlugin([frontendBuiltPath]),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendors',
          minChunks: function (module) {
            const { context } = module;
            return /\/node_modules\//.test(context);
          }
        }),
        new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: true }),
        new CopyWebpackPlugin([{
          from: path.resolve(frontendSrcPath, 'static'),
          to: '.'
        }]),
        new ImageminPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          svgo,
        }),
      ]
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(frontendSrcPath, 'template.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loaders: [babel],
      },
      {
        test: /\.svg$/,
        include: srcPath,
        loaders: [
          babel,
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true,
              svgo,
            }
          }
        ],
      },
      {
        test: /\.css$/,
        exclude: srcPath,
        use: extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
          ],
        }),
      },
      {
        test: /\.scss$/,
        include: srcPath,
        use: extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize&importLoaders=2&modules&localIdentName=[local]__[hash:base64:5]',
            'postcss-loader',
            'sass-loader'
          ],
        }),
      },
    ],
  },
};