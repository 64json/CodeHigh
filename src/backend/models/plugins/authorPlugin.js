import mongoose from 'mongoose';
import { PermissionError } from '/common/error';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const merge = (...args) => {
  const permissions = {};
  for (const arg of args) {
    const keys = Object.keys(arg || {});
    for (const key of keys) {
      if (permissions[key] === true) continue;
      if (arg[key] === true) permissions[key] = true;
      else {
        if (!permissions[key]) permissions[key] = [];
        permissions[key].push(...arg[key]);
      }
    }
  }
  return permissions;
};

const getMatch = (permissions = {}) => {
  return [
    [permissions.none, author => false],
    [permissions.user, author => author.isUser()],
    [permissions.owner, (author, doc) => author.isOwner(doc)],
    [permissions.self, (author, doc) => author.isSelf(doc)],
    [permissions.guest, author => true],
  ];
};

const check = (match, author, doc, process) => {
  for (const [fields, func] of match) {
    if (fields === undefined) continue;
    const permitted = func(author, doc);
    if (!permitted) {
      if (fields === true) throw new PermissionError();
      if (process) {
        fields.forEach(process);
      }
    }
  }
};

const processSet = (schema, options) => {
  const insertMatch = getMatch(merge(options.set, options.insert));
  const modifyMatch = getMatch(merge(options.set, options.modify));
  schema.pre('save', function (next) {
    const doc = this;
    if (doc._author === true) return next();
    if (options.authorField) {
      if (doc.isModified('author')) return next(new PermissionError());
      doc.author = doc._author;
    }
    try {
      check(doc.isNew ? insertMatch : modifyMatch, doc.author, doc, field => {
        if (doc.isModified(field)) throw new PermissionError();
      });
      next();
    } catch (err) {
      next(err);
    }
  });
};

const processGet = (schema, options) => {
  const match = getMatch(options.get);
  const _toJSON = schema.options.toJSON;
  schema.options.toJSON = {
    transform: (doc, ret, options) => {
      if (_toJSON && _toJSON.transform) {
        ret = _toJSON.transform(doc, ret, options);
      }
      check(match, options.req.author, doc, field => {
        delete ret[field];
      });
      return ret;
    }
  };
};

const processRemove = (schema, options) => {
  const match = getMatch(options.remove);
  schema.pre('remove', function (next) {
    const doc = this;
    if (doc._author === true) return next();
    if (options.authorField) {
      if (doc.isModified('author')) return next(new PermissionError());
      doc.author = doc._author;
    }
    try {
      check(match, doc.author, doc);
      next();
    } catch (err) {
      next(err);
    }
  });
};

const authorPlugin = (schema, options) => {
  options = {
    authorField: false,
    set: {},
    insert: {},
    modify: {},
    get: {},
    remove: {},
    ...options,
  };

  schema.methods.setAuthor = function (author) {
    this._author = author;
    return this;
  };

  schema.methods.force = function () {
    this._author = true;
    return this;
  };

  processSet(schema, options);
  processGet(schema, options);
  processRemove(schema, options);
};

export default authorPlugin;