#!/bin/sh

PROJECT_ROOT="$(dirname "$0")/.."

(cd ${PROJECT_ROOT} && git pull && npm install) &&

(chown -R pssde_sl_web: ${PROJECT_ROOT}) &&

(pm2 startOrRestart ${PROJECT_ROOT}/pm2.config.js)
