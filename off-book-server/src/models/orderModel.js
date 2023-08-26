const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderedBooks: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Book',
        },
        isbn: { type: String, required: true },
        title: {
          type: String,
          required: true,
        },
        imageLink: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
        publisher: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        published: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        genre: {
          type: Array,
          required: true,
        },
        website: {
          type: String,
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    delieveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
