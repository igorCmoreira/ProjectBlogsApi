const express = require('express');
const { BlogPosts, User, Categories } = require('../models/index');
const { authToken } = require('../middleware/auth');
const { titleValidation,
        contentValidation,
        categoryIdValidation } = require('../middleware/postValidation');

const { createPost } = require('../services/servicePost');

const router = express.Router();

router.post('/post', authToken, titleValidation, contentValidation,
  categoryIdValidation, async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const postCreated = await createPost(req.body, authorization);
    return res.status(201).send(postCreated);
  } catch (e) {
    next(e);
  }
});
router.get('/post', authToken, async (req, res, next) => {
  try {
    const posts = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Categories, as: 'categories', through: { attributes: [] } }],
    });
    return res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
});

module.exports = router;