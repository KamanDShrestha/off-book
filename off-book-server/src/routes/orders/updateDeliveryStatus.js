const express = require('express');
const { isAdmin, protect } = require('../../middleware/authMiddleware');
const Order = require('../../models/orderModel');
const router = express.Router();

router.put('/:id/delivery', protect, isAdmin, async (req, res) => {
  const orderId = req.params.id;

  if (orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        res.send({ message: 'The order is not found. Please check again' });
        return;
      }

      //updating the delivery status for order of specific type
      order.isDelivered = true;
      order.delieveredAt = new Date().toLocaleString();

      const updatedOrder = await order.save();

      res.status(200).send({
        message: 'The delivery status has been updated for the given order',
      });
    } catch (error) {
      res
        .status(400)
        .send({ message: 'The delivery status has been updated.' });
    }
  }
});

module.exports = router;
