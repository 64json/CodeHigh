import { AuthorizationError } from './error';

const replaceMe = (req, res, next) => {
  if (req.params.object_id === 'me') {
    const { author } = req;
    if (!author.isUser()) return next(new AuthorizationError());
    req.params.object_id = author._id;
  }
  next();
};

const isMongooseObject = object => object && object.constructor.name === 'model';

const now = () => {
  return new Date();
};

export {
  replaceMe,
  isMongooseObject,
  now,
};