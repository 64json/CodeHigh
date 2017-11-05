import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import db from '/common/db';
import { jwtSecret } from '/environment';
import { jwtSignOptions } from '/common/config';
import { AuthorizationError } from '/common/error';
import { now } from '/common/util';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const authSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const getExpiresAt = () => {
  const date = now();
  date.setDate(date.getDate() + 1);
  return date;
};

authSchema.statics.sign = user => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      user_id: user._id
    }, jwtSecret, jwtSignOptions, (err, token) => {
      if (err) return reject(err);
      const expiresAt = getExpiresAt();
      resolve(new Auth({
        user: user._id,
        token,
        expiresAt,
      }));
    });
  });
};

authSchema.statics.verify = token => {
  return Auth.findOne({ token })
    .then(auth => {
      if (!auth) throw new AuthorizationError();
      return auth.verify();
    });
};

authSchema.methods.verify = function () {
  const auth = this;
  return new Promise((resolve, reject) => {
    if (auth.expiresAt < now()) return reject(true);
    jwt.verify(auth.token, jwtSecret, (err, decoded) => {
      if (err) return reject(err);
      if (!auth.user.equals(decoded.user_id)) return reject(true);
      resolve(auth);
    });
  });
};

authSchema.methods.refresh = function () {
  this.expiresAt = getExpiresAt();
  return this.save();
};

const Auth = db.model('Auth', authSchema);
export default Auth;