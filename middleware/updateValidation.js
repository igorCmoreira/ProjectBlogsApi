const { verifyToken } = require('../services/auth');
const { existingUser } = require('../services/seviceUser');
const { findById } = require('../services/servicePost');

const authorVerify = async (req, res, next) => {
  const { authorization } = req.headers;
  const email = verifyToken(authorization);
  const user = await existingUser(email);
  const { id } = req.params;
  const post = await findById(id);
  if (user.id !== post.userId) {
    return res.status(401).send({ message: 'Unauthorized user' });
  }
  next();
};
const catVerify = (req, res, next) => {
  const { categoryIds } = req.body;
  if (categoryIds) {
    return res.status(400).send({ message: 'Categories cannot be edited' });
  }
  next();
};

module.exports = {
  authorVerify,
  catVerify,
};