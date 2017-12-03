const Joi = require('joi');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

const register = async (req, res, next) => {
  const bodySchema = {
    email: Joi.string().lowercase().trim().email()
      .required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    password: Joi.string().required(),
  };
  const { error, value } = Joi.validate(req.body, bodySchema, { abortEarly: false });
  if (error) {
    return next({ code: 400, message: 'Invalid data', obj: error });
  }
  const {
    email, firstName, lastName, password,
  } = value;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  try {
    const user = await User.findOne({ email });
    if (user) {
      return next({ code: 400, message: 'This email already exist' });
    }
    const newUser = await new User({
      email,
      password: passwordHash,
      name: {
        first: firstName,
        last: lastName,
      },
    }).save();
    newUser.password = undefined;
    return res.send(newUser);
  } catch (err) {
    return next({ message: err.message });
  }
};

module.exports = {
  register,
};
