const express = require('express');
const { verificaEmail, verificaName, verificaPassword } = require('../middleware/usersValidations');
const { verificaEmailUnico } = require('../services/seviceUser');
const { User } = require('../models/index.js');

const router = express.Router();

router.post('/user', verificaEmail, verificaName, verificaPassword, async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;
    const { code } = await verificaEmailUnico(req);
    if (code === 409) {
      const { message } = await verificaEmailUnico(req);
      return res.status(code).send({ message });
    }
    const { token } = await verificaEmailUnico(req);
     await User.create({ displayName, email, password });
    return res.status(201).send({ token });
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
   try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (e) {
    next(e);
  }
});
module.exports = router;