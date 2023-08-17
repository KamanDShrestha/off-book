const express = require('express');
const router = express.Router();
const Book = require('../../models/bookModel.js');

router.get('/:id', async (req, res) => {
  console.log(req.params.id);

  const book = await Book.findById(req.params.id);
  
  console.log('Book details ', book);
  res.json(book);
});

module.exports = router;
