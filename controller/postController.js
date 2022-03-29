const express = require('express');
const { authToken } = require('../middleware/auth');
const { titleValidation,
        contentValidation,
        categoryIdValidation } = require('../middleware/postValidation');
const { catVerify, authorVerify } = require('../middleware/updateAndDeleteValidation');

const { createPost, findAll, findById, update, del } = require('../services/servicePost');

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
    const posts = await findAll();
    return res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
});
router.get('/post/:id', authToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await findById(id);
    if (!post) {
      return res.status(404).send({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (e) {
    next(e);
  }
});
router.put('/post/:id', authToken, titleValidation,
contentValidation, catVerify, authorVerify, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await findById(id);
    const updated = await update(title, content, post);
    return res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
});
router.delete('/post/:id', authToken, authorVerify, async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await findById(id);
    await del(post);
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;