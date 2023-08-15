const express = require('express');
const router = express.Router();

const Genre = require('../../models/genreModel');
const { protect, isAdmin } = require('../../middleware/authMiddleware');

router.post('/', protect, isAdmin, async (req, res) => {
  const { genre } = req.body;
  console.log(genre);
  if (genre) {
    try {
      const alreadyExists = await Genre.findOne({ genre: genre });
      console.log('it is here');
      if (alreadyExists) {
        res.status(409).send({ message: 'The genre already exists.' });
      } else {
        const newGenre = await Genre.create({ genre: genre });
        res.status(201).send({ message: 'New genre has been added' });
      }
    } catch (error) {
      res.send({ message: error.message });
    }
  }
});

module.exports = router;
