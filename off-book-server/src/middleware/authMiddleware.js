const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

//this middleware for protecting the routes and seeing if it's admin
// taking the cookie from the cookie
//jwt token need to be decoded
//
const protect = async (req, res, next) => {
  let token;

  //taking the token from the cookie
  token = req.cookies.jwt;
  console.log(token);
  //if there's token, decoding the token from
  if (token) {
    try {
      //decoding the token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      //adding this user to each subsequent request object
      req.user = await User.findById(decodedToken._id).select('-password');

      //calling the next middleware
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, authentication failed');
    }
  } else {
    res.status(401);
    throw new Error('No token is found');
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    res.send({ message: 'You are not authorized to view this page.' });
  }
};

module.exports = { protect, isAdmin };
