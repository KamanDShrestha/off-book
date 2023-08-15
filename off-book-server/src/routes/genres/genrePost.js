const express = require('express');
const router = express.Router();

const Genre = require('../../models/genreModel');
const { protect, isAdmin } = require('../../middleware/authMiddleware');

router.post('/', protect, isAdmin, async (req, res) => {
  const { genre } = req.body;
  console.log(req.body);
  console.log(genre);
  if (genre) {
    try {
      let result = [];
      for (const each of genre) {
        const alreadyExists = await Genre.findOne({ genre: each });
        if (alreadyExists) {
          result.push({ message: ` ${each} as genre already exists.` });
        } else {
          const newGenre = await Genre.create({ genre: each });
          result.push({ message: ` ${each} as genre has been added` });
        }
      }
      res.status(201).json(result);
    } catch (error) {
      res.send({ message: error.message });
    }
  }
});

module.exports = router;
