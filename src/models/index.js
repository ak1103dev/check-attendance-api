const config = require('config');
const mongoose = require('mongoose');

const User = require('./user');
const AccessToken = require('./access-token');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoUrl'), {
  useMongoClient: true,
});

module.exports = {
  User,
  AccessToken,
};
