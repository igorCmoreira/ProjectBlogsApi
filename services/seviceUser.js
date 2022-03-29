const { User } = require('../models/index');

const { genAuthToken, verifyToken } = require('./auth');

const existingUser = async (email) => {
  const users = await User.findAll();
  const found = users.find((user) => user.email === email);
  return found;
};
const verificaEmailUnico = async (req) => {
  const { email } = req.body;
  const found = await existingUser(email);
  if (!found) {
    const token = genAuthToken(email);
    return { code: 201, token };
  }
  return { code: 409, message: 'User already registered' };
};
const create = async (displayName, email, password) => User.create(
  { displayName, email, password },
);
const findAll = async () => User.findAll();
const findById = async (id) => User.findByPk(id);
const deleteMe = async (token) => {
  const email = verifyToken(token);
  const user = await existingUser(email);
  return user.destroy();
};
module.exports = {
  verificaEmailUnico,
  existingUser,
  create,
  findAll,
  findById,
  deleteMe,
};