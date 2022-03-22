const express = require('express');
const authService = require('../services/auth');
const { passwordVerify, emailVerify, verifyUser } = require('../middleware/loginValidation');

const router = express.Router();

router.post('/login', passwordVerify, emailVerify, verifyUser, async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = authService.genAuthToken(email);
    return res.status(200).send({ token });
  } catch (e) {
    next(e);
  }
});
module.exports = router;