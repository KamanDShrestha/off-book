const express = require('express');
const { User } = require('../../models/userModel');
const { protect } = require('../../middleware/authMiddleware');

// const isAdmin = require('./middleware/authMiddleware');
const router = express.Router();

//approach
//--taking out the id from the cookie and

router.post('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    //if there's name, email and so on provided as req body, updating those
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    //after changing the individual bodies
    const updatedUser = await user.save();

    res.status(201).json({
      id: updatedUser._id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      message: 'The user details has been updated successfully',
    });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

module.exports = router;
