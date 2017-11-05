import { NotFoundError } from '/common/error';

const codeHighPlugin = (schema, options) => {
  schema.statics.create = function (body) {
    const Model = this;
    return new Promise((resolve, reject) => resolve(new Model(body)));
  };

  schema.statics.get = function (doc_id) {
    const Model = this;
    return Model.findById(doc_id)
      .then(doc => {
        if (!doc) throw new NotFoundError();
        return doc;
      });
  };

  const _toJSON = schema.options.toJSON;
  schema.options.toJSON = {
    transform: (doc, ret, options) => {
      if (_toJSON && _toJSON.transform) {
        ret = _toJSON.transform(doc, ret, options);
      }
      delete ret.__v;
      return ret;
    }
  };
};

export default codeHighPlugin;