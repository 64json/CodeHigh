const path = require('path');
const compression = require('compression');
const history = require('connect-history-api-fallback');
const express = require('express');
const app = express();

const {
  credentials,
  webhook,
  endpoint
} = require('../environment');

if (credentials) {
  app.all('*', (req, res, next) => {
    if (req.secure) return next();
    res.redirect('https://' + req.hostname + req.url);
  });
}

if (webhook) {
  const crypto = require('crypto');
  const concat = require('concat-stream');
  const { spawn } = require('child_process');
  app.post('/apply_release', (req, res) => {
    req.pipe(concat((data) => {
      const hmac = crypto.createHmac('sha1', webhook.secret);
      const signature_delivered = req.headers['x-hub-signature'];
      const signature_created = 'sha1=' + hmac.update(data).digest('hex');
      if (signature_delivered !== signature_created) return res.status(500).send({});

      res.send({});
      const command = spawn('sh', [path.resolve(__dirname, '..', 'bin', 'pull.sh')]);
      command.stdout.on('data', (data) => {
        console.info(data.toString());
      });
      command.stderr.on('data', (data) => {
        console.error(data.toString());
      });
      command.on('exit', (code) => {
        console.info('child process exited with code ' + code.toString());
      });
    }));
  });
}

const frontend = require('./frontend');
const backend = require('./backend');
app.use(endpoint, backend);
app.use(history());
app.use(compression());
app.use(frontend);

module.exports = app;