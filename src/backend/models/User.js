import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;

const modelName = 'User';
const userSchema = new Schema({
  fb_user_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  first_name: { type: String, required: true },
});

userSchema.plugin(authorPlugin, {
  insert: {
    guest: true,
  },
  modify: {
    none: ['fb_user_id'],
    self: true,
  },
  get: {
    guest: true,
  },
  remove: {
    self: true,
  }
});

userSchema.methods.isUser = function () {
  return !this.isNew;
};

userSchema.methods.isOwner = function (doc) {
  return this._id.equals(doc.author._id);
};

userSchema.methods.isSelf = function (doc) {
  return this._id.equals(doc._id);
};

const User = db.model(modelName, userSchema);
export default User;