const express = require('express');
const router = express.Router();
const Genre = require('../../models/genreModel');

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res
      .status(404)
      .send({ message: 'Genres are not available at the moment!' });
  }
});

module.exports = router;
