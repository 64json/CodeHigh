import express from 'express';
import morgan from 'morgan';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import controllers from '/controllers';
import db from '/common/db';
import connectSocket from './socket';

const app = express();
const httpServer = http.Server(app);
connectSocket(httpServer);
db.on('error', console.error);
db.once('open', () => {
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(controllers);
});

export default httpServer;