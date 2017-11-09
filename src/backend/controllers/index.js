import express from 'express';
import { Auth, Rating, Topic, User } from '/models';
import { isMongooseObject, replaceMe } from '/common/util';
import { AuthorizationError, NotFoundError, PermissionError } from '/common/error';
import Router from './CodeHighRouter';
import auth from './auth';
import solution from './solution';

const router = new express.Router();

const processWhere = (Model, where) => {
  const definition = Model.schema.obj;
  const query = {};
  const keys = Object.keys(where);
  for (const key of keys) {
    if (!definition[key]) continue;
    const property = definition[key];
    const value = where[key];
    switch (property.type) {
      case String:
        if (property.enum) {
          query[key] = value;
        } else {
          query[key] = new RegExp(value, 'i');
        }
        break;
      default:
        query[key] = value;
    }
  }
  return query;
};

const processPopulate = populate => {
  const fields = populate ? populate.split(',') : [];
  return fields.map(field => {
    const query = {};
    let cursor = query;
    const tokens = field.split('.');
    for (const token of tokens) {
      cursor = cursor.populate = { path: token };
    }
    return query.populate;
  });
};

const getRequestOptions = (req) => {
  const {
    sort = null,
    skip = null,
    limit = null,
    populate = null,
    ...where,
  } = req.query;
  return {
    sort,
    skip,
    limit,
    populate: processPopulate(populate),
    where: Object => processWhere(Object, where)
  };
};

router.use((req, res, next) => {
  req.options = getRequestOptions(req);

  res.return = obj => {
    const flat = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
      const value = obj[key];
      if (isMongooseObject(value)) {
        flat[key] = value.toJSON({ req });
      } else if (Array.isArray(value) && isMongooseObject(value[0])) {
        flat[key] = value.map(elem => elem.toJSON({ req }));
      } else {
        flat[key] = value;
      }
    }
    res.json(flat);
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
router.use('/solution', solution);
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