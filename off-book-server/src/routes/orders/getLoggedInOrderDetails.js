const express = require('express');
const Order = require('../../models/orderModel');
const { protect } = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { user } = req.body;
  if (user) {
    try {
      const orders = await Order.find({ user: user });
      if (orders) {
        res
          .status(201)
          .send({ ...orders, message: 'Your orders have been provided' });
      } else {
        res.status(400).send({ message: 'You have not placed any orders' });
      }
    } catch (error) {
      res
        .status(400)
        .send({ message: `The order can not be provided. ${error.message}` });
    }
  }
});

module.exports = router;
