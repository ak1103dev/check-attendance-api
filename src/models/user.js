const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  email: String,
  name: {
    first: String,
    last: String,
  },
  password: String,
});

module.exports = mongoose.model('User', schema);
