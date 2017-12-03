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
router.post('/login', user.login);

module.exports = router;
