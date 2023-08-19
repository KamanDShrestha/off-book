const express = require('express');
const { protect, isAdmin } = require('../../middleware/authMiddleware');
const Order = require('../../models/orderModel');
const router = express.Router();

router.get('/:id', protect, isAdmin, async (req, res) => {
  //id in string format can be used for order id
  const orderId = req.params.id;
  if (orderId) {
    try {
      const ordered = await Order.findById(orderId);
      if (ordered) {
        res.status(200).json(ordered);
      } else {
        res.status(404).json({
          message:
            'This order cannot be found. Please provide valid credentials',
        });
      }
    } catch (error) {
      res.status(400).send({ message: `Some error occured. ${error.message}` });
    }
  }
});

module.exports = router;
