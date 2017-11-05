const {
  __PROD__,
  __DEV__,
  devProxyPort,
  socketPort,
  backendBuiltPath,
  endpoint
} = require('../environment');

if (__DEV__) {
  const express = require('express');
  const webpack = require('webpack');
  const proxy = require('http-proxy-middleware');

  const webpackConfig = require('../webpack.backend.config.js');

  const compiler = webpack(webpackConfig);

  let lastHash = null;
  let httpServer = null;
  let socketServer = null;
  compiler.watch({}, (err, stats) => {
    if (err) {
      lastHash = null;
      compiler.purgeInputFileSystem();
      console.error(err);
    }
    if (stats.hash !== lastHash) {
      lastHash = stats.hash;
      console.info(stats.toString({
        cached: false,
        colors: true
      }));

      try {
        if (httpServer) httpServer.close();
        if (socketServer) socketServer.close();
        const backendApp = express();
        const keys = Object.keys(require.cache).filter(key => key.startsWith(backendBuiltPath));
        console.log(keys);
        keys.forEach(key => delete require.cache[key]);
        const { app, io } = require(backendBuiltPath);
        backendApp.use(app);
        httpServer = backendApp.listen(devProxyPort);
        socketServer = io.listen(socketPort);
      } catch (e) {
        console.error(e);
      }
    }
  });

  module.exports = proxy({
    target: `http://localhost:${devProxyPort}/`,
    pathRewrite: { ['^' + endpoint]: '' }
  });
} else {
  module.exports = require(backendBuiltPath).default;
}