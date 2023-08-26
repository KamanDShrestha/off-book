const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
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
});

//making a book model fron the schema
const Book = mongoose.model('Book', bookSchema);

// Add a text index to the 'title' field
Book.collection.createIndex({ title: 'text' }, function (err, result) {
  console.log(result);
});

module.exports = Book;
