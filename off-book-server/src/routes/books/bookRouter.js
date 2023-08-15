const express = require('express');
const Book = require('../../models/bookModel');

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
  const genre = req.query.genre;
  console.log('Here genre', genre);
  try {
    if (genre) {
      const books = await Book.find({ genre: genre });
      if (books) {
        res.status(200).json(books);
      }
      return;
    }
    console.log(Book);
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res
      .status(401)
      .send({ message: 'Books cannot be retrieved at the moment.' });
  }
});

module.exports = bookRouter;
