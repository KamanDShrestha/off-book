const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const Wishlist = require('../../models/wishlistModel');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { user, addedBooks } = req.body;
  console.log(user, addedBooks);
  if (user) {
    try {
      const alreadyExists = await Wishlist.findOne({ user: user });
      if (alreadyExists) {
        await Wishlist.deleteOne({ user });
      }
      const wishlist = await Wishlist.create({ user, addedBooks });
      res.status(201).send({ message: 'Added within the wishlist' });
    } catch (error) {
      res.status(400).send({ message: `Error occured.${error.message}` });
    }
  }
});

module.exports = router;
