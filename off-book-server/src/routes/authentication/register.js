const router = require('express').Router();
const { User, validate } = require('../../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  let body = { ...req.body };
  console.log(body);
  try {
    //validating the body using Joi on the body from the request
    // const { error } = validate(body);
    // if (error) {
    //   return res.status(404).send(error.details[0].message);
    // }

    //if there's not user then adding the role as user
    if (!body.role) body = { ...body, role: 'user' };

    //checking if the user already exists
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).send({
        message:
          'User has already been registered. Please try again with valid credentials.',
      });
    }

    //decrypting the password using bcyrpt
    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashedPassword = await bcrypt.hash(body.password, salt);

    await new User({ ...body, password: hashedPassword }).save();
    res.status(201).send({ message: 'User has been registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
