const express = require('express');
const { protect, isAdmin } = require('../../middleware/authMiddleware');
const { User } = require('../../models/userModel');
const router = express.Router();

router.delete('/:email', protect, isAdmin, async (req, res) => {
  console.log(req.params.email);
  const email = req.params.email;
  if (email) {
    try {
      const deletedUser = await User.deleteOne({ email });
      res.status(200).send({ message: 'User has been deleted' });
    } catch (error) {}
  } else {
    res.status(400).send({ message: 'Provide valid email for deletion' });
  }
});

module.exports = router;
