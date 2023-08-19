const express = require('express');
const { protect } = require('../../middleware/authMiddleware');
const Order = require('../../models/orderModel');
const { User } = require('../../models/userModel');
const router = express.Router();

router.put('/:id/pay', protect, async (req, res) => {
  const orderId = req.params.id;

  if (orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        res.send({
          message: 'No orders were found for updating payment status',
        });
        return;
      }
      order.isPaid = true;
      order.paidAt = new Date().toLocaleString();
      //   const updatedOrder = { ...order, isPaid: true, paidAt: new Date() };
      const updatedOrder = await order.save();

      res
        .status(200)
        .send({
          ...updatedOrder,
          message: 'The payment status has been updated',
        });
    } catch (error) {
      res
        .status(400)
        .send({ message: 'The order cannot be updated at the moment' });
    }
  }
});

module.exports = router;
