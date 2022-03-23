const express = require('express');
const { Categories } = require('../models/index');

const { authToken } = require('../middleware/auth');
const { nameVerify } = require('../middleware/categoriesValidation');

const router = express.Router();

router.post('/categories', nameVerify, authToken, async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Categories.create({ name });
    return res.status(201).send(category);
  } catch (e) {
    next(e);
  }
});
router.get('/categories', authToken, async (req, res, next) => {
  try {
    const category = await Categories.findAll();
    return res.status(200).send(category);
  } catch (e) {
    next(e);
  }
});

module.exports = router;