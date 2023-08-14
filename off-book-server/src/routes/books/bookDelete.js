const express = require('express');
const { protect, isAdmin } = require('../../middleware/authMiddleware');
const Book = require('../../models/bookModel');
const router = express.Router();

router.post('/:isbn', protect, isAdmin, async (req, res) => {
  //providing isbn from the request
  const isbn = req.params.isbn;
  console.log(isbn);
  try {
    //checking if this isbn exists
    const doesExist = await Book.findOne({ isbn });
    if (doesExist) {
      const deletedBook = await Book.deleteOne({ isbn: doesExist.isbn });
      res
        .status(200)
        .send({ message: 'The book has been deleted.', ...deletedBook });
    } else {
      res.status(409).send({
        message:
          'No books are found with this isbn. Please try again after validating.',
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        'The book cannot be deleted at the moment. Please try again later.',
    });
  }
});

module.exports = router;
