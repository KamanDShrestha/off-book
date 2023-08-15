const express = require('express');
const { isAdmin, protect } = require('../../middleware/authMiddleware');
const Book = require('../../models/bookModel');
const router = express.Router();

router.post('/', protect, isAdmin, async (req, res) => {
  const book = req.body;
  console.log(book);
  if (book) {
    const isbnNo = book.isbn;

    try {
      const alreadyExists = await Book.findOne({ isbn: isbnNo });
      if (alreadyExists) {
        res
          .status(409)
          .send({ message: 'The book already exists within our store' });
      } else {
        console.log('almost added');
        const insertedBook = await Book.create({
          ...book,
          price: Number(book.price),
        });
        console.log('should be added');
        res.status(201).send({
          message: 'The book has been successfully added.',
          ...insertedBook,
        });
      }
    } catch (error) {
      res.status(401).send({
        message: `Please provide valid book details for adding. ${error.message}`,
      });
    }
  }
  //checking if the book already exists
});

module.exports = router;
