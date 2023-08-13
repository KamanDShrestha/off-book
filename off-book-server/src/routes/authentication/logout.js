const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Logging out');
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.send({ message: 'You have been logged out successfully' });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

module.exports = router;
