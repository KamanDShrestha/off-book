const express = require('express');
const Book = require('../../models/bookModel');

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
  console.log(Book);
  const books = await Book.find();
  res.json(books);
});

module.exports = bookRouter;
