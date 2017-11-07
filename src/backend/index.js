import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import controllers from '/controllers';
import db from '/common/db';
import io from './io';

const app = express();
db.on('error', console.error);
db.once('open', () => {
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(controllers);
});
app.io = io;

export default app;