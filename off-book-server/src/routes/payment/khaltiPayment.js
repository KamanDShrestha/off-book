const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/:id', async (req, res) => {
  const orderData = req.body;
  console.log('orderData', orderData);
  const id = req.params.id;
  const options = {
    headers: {
      Authorization: 'Key 08b8356ee1a84d0e87f1c9b69bf3a838',
      'Content-Type': 'application/json',
    },
  };

  try {
    const payment = await axios
      .post(
        'https://a.khalti.com/api/v2/epayment/initiate/',
        { ...orderData },
        options
      )
      .then((res) => res.data);
    console.log('any payment', payment);
    res.send({ ...payment });
  } catch (error) {
    console.log({ message: error });
    res.send({ message: error.message });
  }
});

module.exports = router;
