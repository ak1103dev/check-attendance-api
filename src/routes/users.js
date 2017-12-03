const { Router } = require('express');
// const Joi = require('joi');
// const bcrypt = require('bcrypt');

const user = require('../services/user');
// const { User, AccessToken } = require('../models');
// const generateToken = require('../utils/generateToken');

const router = Router();

router.get('/me', (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send({ message: 'Unauthorized User' });
  }
});

router.post('/', user.register);

// router.post('/login', (req, res) => {
//   const bodySchema = {
//     username: Joi.string().required(),
//     password: Joi.string().required(),
//   };
//   const { error, value } = Joi.validate(req.body, bodySchema);
//   if (error) {
//     return res.status(400).send(error);
//   }
//   const { username, password } = value;
//   return User.findOne({ username })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new Error({ code: 400, message: 'Email or password is wrong.' }));
//       }
//       const hasPassword = bcrypt.compareSync(password, user.password);
//       if (!hasPassword) {
//         return Promise.reject(new Error({ code: 400, message: 'Email or password is wrong.' }));
//       }
//       return generateToken()
//         .then((token) => {
//           new AccessToken({ token, userId: user._id }).save();
//           user.password = undefined;
//           return res.send({
//             user,
//             accessToken: token,
//           });
//         });
//     })
//     .catch(err => res.status(err.code || 500).send({ error: err }));
// });

module.exports = router;
