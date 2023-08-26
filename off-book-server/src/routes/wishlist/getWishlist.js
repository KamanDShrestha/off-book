const express = require('express');
const Wishlist = require('../../models/wishlistModel');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  if (userId) {
    try {
      const wishlist = await Wishlist.findOne({ user: userId });
      console.log(wishlist);
      if (wishlist) {
        res.json(wishlist);
      } else {
        res.json([]);
      }
    } catch (error) {
      res.status(400).send({ message: `Error occured. ${error.message}` });
    }
  } else {
    res.json([]);
  }
});

module.exports = router;
