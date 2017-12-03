module.exports = {
  user: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).send({ error: { message: 'Unauthorized user' } });
    }
  },
};
