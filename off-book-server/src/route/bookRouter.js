const express = require('express');
const { default: Book } = require('../models/bookModel');

const bookRouter = express.Router();

bookRouter.get('/', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

module.exports = bookRouter;
