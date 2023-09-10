const express = require('express');
const { User } = require('../../models/userModel');
const Order = require('../../models/orderModel');
const { protect } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const {
    orderedBooks,
    user,
    shippingAddress,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = req.body;
  if (user) {
    //checking if the user exists
    try {
      const userExists = await User.findById(user);
      if (!userExists) {
        res
          .status(401)
          .send({ message: 'You are unauthorized to make any orders!' });
        return;
      }

      const orderPlaced = await Order.create({
        user: user,
        orderedBooks: orderedBooks.map((book) => ({
          ...book,
          book: book._id,
          _id: undefined,
        })),
        shippingAddress: shippingAddress,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        paymentMethod: paymentMethod,
        isPaid: isPaid,
        paidAt: paidAt,
        isDelivered: isDelivered,
        deliveredAt: deliveredAt,
      });

      res
        .status(201)
        .send({ message: 'Your order has been placed', ...orderPlaced });
    } catch (error) {
      res
        .status(400)
        .send({ message: `The order can not be placed ${error.message}` });
    }
  }
});

module.exports = router;
