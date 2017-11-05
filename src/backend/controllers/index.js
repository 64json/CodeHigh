import express from 'express';
import { Auth, Rating, Solution, Testcase, Topic, User } from '/models';
import { isMongooseObject, replaceMe } from '/common/util';
import { AuthorizationError, NotFoundError, PermissionError } from '/common/error';
import Router from './CodeHighRouter';
import auth from './auth'

const router = new express.Router();

const processWhere = (Model, where) => {
  const definition = Model.schema.obj;
  const $and = [];
  const keys = Object.keys(where);
  for (const key of keys) {
    if (!definition[key]) continue;
    const property = definition[key];
    const value = where[key];
    switch (property.type) {
      case String:
        if (property.enum) {
          $and.push({ [key]: value });
        } else {
          $and.push({ [key]: new RegExp(value, 'i') });
        }
        break;
      default:
        $and.push({ [key]: value });
    }
  }
  return $and.length ? { $and } : {};
};

const getRequestOptions = (req) => {
  const {
    populate = '',
    ...where,
  } = req.query;
  return {
    populate: populate.split(','),
    where: Object => processWhere(Object, where)
  };
};

router.use((req, res, next) => {
  req.options = getRequestOptions(req);

  res.return = obj => {
    const flat = {};
    const keys = Object.keys(obj);
    const promises = keys.map(key => new Promise((resolve, reject) => {
      const value = obj[key];
      if (isMongooseObject(value)) {
        const Object = value.constructor;
        resolve(Object.populate(value, req.options.populate)
          .then(newValue => {
            flat[key] = newValue.toJSON({ req });
          }));
      } else if (Array.isArray(value) && isMongooseObject(value[0])) {
        const Object = value[0].constructor;
        resolve(Object.populate(value, req.options.populate)
          .then(newValue => {
            flat[key] = newValue.map(elem => elem.toJSON({ req }));
          }));
      } else {
        flat[key] = value;
        resolve();
      }
    }));
    return Promise.all(promises)
      .then(() => res.json(flat));
  };

  const { token } = req.cookies;
  if (token) {
    Auth.verify(token)
      .catch(() => {
        res.cookie('token', '');
        throw new AuthorizationError();
      })
      .then(auth => Auth.populate(auth, 'user'))
      .then(auth => auth.refresh())
      .then(auth => {
        req.author = auth.user;
        next();
      })
      .catch(next);
  } else {
    req.author = new User();
    next();
  }
});
router.use('/auth', auth);
router.use('/rating', Router(Rating, 'rating', 'ratings'));
router.use('/solution', Router(Solution, 'solution', 'solutions'));
router.use('/testcase', Router(Testcase, 'testcase', 'testcases'));
router.use('/topic', Router(Topic, 'topic', 'topics'));
router.use('/user', Router(User, 'user', 'users', replaceMe));
router.use((req, res, next) => next(new NotFoundError()));
router.use((err, req, res, next) => {
  const statusMap = [
    [AuthorizationError, 401],
    [PermissionError, 403],
    [NotFoundError, 404],
    [Error, 500],
  ];
  const [, status] = statusMap.find(([Error]) => err instanceof Error);
  res.status(status);
  res.json({
    status,
    err,
  });
  console.error(err);
});

export default router;