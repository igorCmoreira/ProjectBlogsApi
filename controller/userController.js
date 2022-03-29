const express = require('express');
const { verificaEmail, verificaName, verificaPassword } = require('../middleware/userValidation');
const { verificaEmailUnico, create, findAll, findById } = require('../services/seviceUser');
const { authToken } = require('../middleware/auth');

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
     await create({ displayName, email, password });
    return res.status(201).send({ token });
  } catch (e) {
    next(e);
  }
});

router.get('/user', authToken, async (req, res, next) => {
   try {
    const users = await findAll();
    return res.status(200).send(users);
  } catch (e) {
    next(e);
  }
});

router.get('/user/:id', authToken, async (req, res, next) => {
  try {
   const { id } = req.params;
   const users = await findById(id);
   if (!users) {
     return res.status(404).send({ message: 'User does not exist' });
   }
   return res.status(200).send(users);
 } catch (e) {
   next(e);
 }
});
module.exports = router;