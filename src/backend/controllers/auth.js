import express from 'express';
import FB from 'fb';
import { Auth, User } from '/models';

const router = express.Router();

const createAuth = (req, res, next) => {
  const { fb_access_token } = req.body;
  FB.setAccessToken(fb_access_token);
  FB.options({ Promise });
  FB.api('me?fields=first_name,name')
    .then(response => {
      const { name, first_name, id: fb_user_id } = response;
      return User.findOne({ fb_user_id })
        .then(user => {
          if (user) return Auth.sign(user);
          else {
            return new User({
              fb_user_id,
              name,
              first_name,
            }).save()
              .then(Auth.sign);
          }
        });
    })
    .then(auth => auth.save())
    .then(auth => {
      res.cookie('token', auth.token);
      res.return({ auth });
    })
    .catch(next);
};

const destroyAuth = (req, res, next) => {
  const { token } = req.cookies;
  Auth.findOne({ token })
    .then(auth => {
      if (!auth) return auth;
      return auth.remove();
    })
    .then(auth => {
      res.cookie('token', '');
      res.return({ auth })
    })
    .catch(next);
};

router.route('/')
  .post(createAuth)
  .delete(destroyAuth);

export default router;