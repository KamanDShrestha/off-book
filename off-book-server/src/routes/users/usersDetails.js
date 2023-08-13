const express = require('express');
const { isAdmin, protect } = require('../../middleware/authMiddleware');
const { User } = require('../../models/userModel');
const router = express.Router();

router.route('/').get(protect, isAdmin, async (req, res) => {
  const users = await User.find();
  console.log(users);
});

module.exports = router;
