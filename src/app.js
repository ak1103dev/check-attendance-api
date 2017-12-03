const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { logErrors, clientErrorHandler } = require('./middlewares/handleError');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoUrl'), {
  useMongoClient: true,
});

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(auth);
app.use('/', routes);
if (process.env.NODE_ENV !== 'test') {
  app.use(logErrors);
}
app.use(clientErrorHandler);

module.exports = app;
