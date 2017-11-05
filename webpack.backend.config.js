const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
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

const compact = arr => arr.filter(v => v !== false);
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
fs.readdirSync(backendSrcPath).forEach(name => {
  alias['/' + name] = path.resolve(backendSrcPath, name);
});

module.exports = {
  name: 'backend',
  target: 'node',
  node: {
    __dirname: true,
  },
  devtool: __DEV__ && 'inline-eval-cheap-source-map',
  externals: [nodeExternals()],
  entry: backendSrcPath,
  resolve: {
    modules: [backendSrcPath],
    extensions: ['.js'],
    alias,
  },
  output: {
    filename: 'index.js',
    path: backendBuiltPath,
    publicPath: endpoint,
    library: 'backend',
    libraryTarget: 'umd',
  },
  plugins: __DEV__ ? [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'development'" }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ] : [
    new CleanWebpackPlugin([backendBuiltPath]),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "'production'" }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: srcPath,
        loaders: [babel],
      },
    ],
  },
};