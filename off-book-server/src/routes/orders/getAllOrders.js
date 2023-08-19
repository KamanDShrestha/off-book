const express = require('express');
const { isAdmin, protect } = require('../../middleware/authMiddleware');
const Order = require('../../models/orderModel');
const router = express.Router();

router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).send({ message: 'No orders are made at the moment' });
    }
  } catch (error) {
    res.status(400).send({
      message: 'The orders cannot be obtained at the moment. Please try again',
    });
  }
});

module.exports = router;
