const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./middlewares/auth');
const { logErrors, clientErrorHandler } = require('./middlewares/handleError');

const app = express();

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
