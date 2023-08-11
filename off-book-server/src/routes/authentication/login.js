const express = require('express');
const { User } = require('../../models/userModel');
const loginRouter = express.Router();
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  //getting the request body
  const reqBody = { ...req.body };
  console.log(reqBody);
  //checking if provided email is within the database
  try {
    const email = reqBody.email;
    console.log(email);
    if (email) {
      const user = await User.findOne({ email });
      console.log(user);
      if (user && (await user.matchPassword(reqBody.password))) {
        //making a json web token

        const token = user.generateAuthToken();

        //save token to cookie
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1day
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
        });

        res.status(201).send({
          message: 'User successfully loggedIn!',
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          role: user.role,
        });
      } else {
        res.status(409).send({ message: 'Password is incorrect!' });
      }
    }
  } catch (error) {
    s;
    res.status(400).send('User cannot be logged in', error);
  }
});

module.exports = loginRouter;
