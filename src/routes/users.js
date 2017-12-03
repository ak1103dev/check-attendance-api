const { Router } = require('express');
const auth = require('../utils/auth');
const user = require('../services/user');

const router = Router();

router.get('/me', auth.user, user.getUserMe);
router.post('/', user.register);
router.post('/login', user.login);

module.exports = router;
