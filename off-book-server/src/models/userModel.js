const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity'); //for providing different ranges of complexity within the password
const Joi = require('joi');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

//generating the authentication token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
  return token;
};

userSchema.methods.matchPassword = function (providedPassword) {
  return bcrypt.compare(providedPassword, this.password);
};

const User = mongoose.model('User', userSchema);

//for validating the API request
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    role: Joi.string().label('Role'),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
