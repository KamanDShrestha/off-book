const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    addedBooks: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        isbn: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        imageLink: {
          type: String,
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
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
