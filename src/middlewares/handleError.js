exports.logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

/* eslint-disable no-unused-vars */
exports.clientErrorHandler = (err, req, res, next) => {
  res.status(err.code || 500).send({ error: err });
};
