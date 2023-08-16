const express = require('express');
const Book = require('../../models/bookModel');
const sortByPriceDes = require('../../helpers/sortByPriceDes');
const sortByPriceAsc = require('../../helpers/sortByPriceAsc');

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
  const genre = req.query.genre;
  const sortByPrice = req.query.sortByPrice;
  console.log(sortByPrice);
  console.log('Here genre', genre);
  try {
    let result = [];
    if (genre) {
      const books = await Book.find({ genre: genre });
      if (books) {
        // res.status(200).json(books);
        result = [...books];
        console.log(result);
      }
    } else {
      console.log(Book);
      const books = await Book.find();
      // res.json(books);
      result = [...books];
      // console.log(result);
    }

    if (sortByPrice) {
      if (sortByPrice === 'Descending') {
        res.status(200).json(sortByPriceDes(result));
      } else {
        res.status(200).json(sortByPriceAsc(result));
      }
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).send({
      message: `Books cannot be retrieved at the moment. ${error.message}`,
    });
  }
});

module.exports = bookRouter;
