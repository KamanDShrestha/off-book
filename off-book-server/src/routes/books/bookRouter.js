const express = require('express');
const Book = require('../../models/bookModel');
const sortByPriceDes = require('../../helpers/sortByPriceDes');
const sortByPriceAsc = require('../../helpers/sortByPriceAsc');

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
  const genre = req.query.genre;
  const sortByPrice = req.query.sortByPrice;
  const searchQuery = req.query.searchQuery;
  console.log(sortByPrice);
  console.log('Here genre', genre);
  console.log('Here search', searchQuery);
  try {
    let result = [];

    if (searchQuery) {
      console.log(searchQuery);
      const books = await Book.find({ $text: { $search: searchQuery } });
      if (books) {
        res.json(books);
        return;
      } else {
        res.send({ message: `No books were found for ${searchQuery}` });
        return;
      }
    }

    if (genre) {
      const books = await Book.find({ genre: genre });
      if (books) {
        // res.status(200).json(books);
        result = [...books];
        console.log(result);
      }
    } else {
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
