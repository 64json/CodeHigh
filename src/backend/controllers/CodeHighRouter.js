import express from 'express';
import { NotFoundError } from '/common/error';

const create = (Model, singular, plural, paramReplacer = (req, res, next) => next()) => {
  const router = express.Router();

  const allObjects = (req, res, next) => {
    const { where, sort, skip, limit, populate } = req.options;
    Model.find(where(Model)).sort(sort).skip(skip).limit(limit).populate(populate)
      .then(objects => res.return({ [plural]: objects }))
      .catch(next);
  };

  const getObject = (req, res, next) => {
    const { object_id } = req.params;
    Model.findById(object_id).populate(req.options.populate)
      .then(object => {
        if (!object) throw new NotFoundError();
        return res.return({ [singular]: object });
      })
      .catch(next);
  };

  const addObject = (req, res, next) => {
    const { body } = req;
    Model.create(body)
      .then(object => object.setAuthor(req.author).save())
      .then(object => res.return({ [singular]: object }))
      .catch(next);
  };

  const updateObject = (req, res, next) => {
    const { object_id } = req.params;
    const { body } = req;
    Model.get(object_id)
      .then(object => object.setAuthor(req.author).set(body).save())
      .then(object => res.return({ [singular]: object }))
      .catch(next);
  };

  const deleteObject = (req, res, next) => {
    const { object_id } = req.params;
    Model.get(object_id)
      .then(object => object.setAuthor(req.author).remove())
      .then(object => res.return({ [singular]: object }))
      .catch(next);
  };

  router.route('/')
    .get(allObjects)
    .post(addObject);

  router.route('/:object_id')
    .all(paramReplacer)
    .get(getObject)
    .put(updateObject)
    .delete(deleteObject);

  return router;
};

export default create;