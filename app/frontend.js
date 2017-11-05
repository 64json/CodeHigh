const express = require('express');

const {
  __PROD__,
  __DEV__,
  frontendSrcPath,
  frontendBuiltPath,
} = require('../environment');

if (__DEV__) {
  const path = require('path');
  const webpack = require('webpack');
  const webpackDev = require('webpack-dev-middleware');
  const webpackHot = require('webpack-hot-middleware');

  const webpackConfig = require('../webpack.frontend.config.js');

  const compiler = webpack(webpackConfig);
  const app = express();

  app.use(express.static(path.resolve(frontendSrcPath, 'static')));
  app.use(webpackDev(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      cached: false,
      colors: true
    },
  }));
  app.use(webpackHot(compiler));

  module.exports = app;
} else {
  module.exports = express.static(frontendBuiltPath);
}