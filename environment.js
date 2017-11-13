const path = require('path');
const fs = require('fs');

const {
  NODE_ENV = 'production',

  HTTP_PORT = '8080',
  HTTPS_PORT = '8443',
  PROXY_PORT = '3000',

  CREDENTIALS_ENABLED = '0',
  CREDENTIALS_PATH,
  CREDENTIALS_CA,
  CREDENTIALS_KEY,
  CREDENTIALS_CERT,

  MONGO_URI = 'mongodb://localhost/code_high',
  JWT_SECRET = 'JWT_SECRET_KEY_GOES_HERE',

  WEBHOOK_ENABLED = '0',
  WEBHOOK_SECRET,
} = process.env;

const isEnabled = v => v === '1';

const __PROD__ = NODE_ENV === 'production';
const __DEV__ = !__PROD__;

const httpPort = parseInt(HTTP_PORT);
const httpsPort = parseInt(HTTPS_PORT);
const proxyPort = parseInt(PROXY_PORT);

const read = (file) => fs.readFileSync(path.resolve(CREDENTIALS_PATH, file));
const credentials = isEnabled(CREDENTIALS_ENABLED) && {
  ca: read(CREDENTIALS_CA),
  key: read(CREDENTIALS_KEY),
  cert: read(CREDENTIALS_CERT),
};

const mongoUri = MONGO_URI;
const jwtSecret = JWT_SECRET;

const webhook = isEnabled(WEBHOOK_ENABLED) && {
  secret: WEBHOOK_SECRET,
};

const builtPath = path.resolve(__dirname, 'built');
const frontendBuiltPath = path.resolve(builtPath, 'frontend');
const backendBuiltPath = path.resolve(builtPath, 'backend');
const srcPath = path.resolve(__dirname, 'src');
const frontendSrcPath = path.resolve(srcPath, 'frontend');
const backendSrcPath = path.resolve(srcPath, 'backend');
const publicPath = path.resolve(__dirname, 'public');

const endpoint = '/api';

module.exports = {
  __PROD__,
  __DEV__,
  httpPort,
  httpsPort,
  proxyPort,
  credentials,
  mongoUri,
  jwtSecret,
  webhook,
  builtPath,
  frontendBuiltPath,
  backendBuiltPath,
  srcPath,
  frontendSrcPath,
  backendSrcPath,
  publicPath,
  endpoint,
};