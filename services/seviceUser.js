const { User } = require('../models/index');

const verificaEmailUnico = async (req) => {
  const { email } = req.body;
  const users = await User.findAll();
  const found = users.find((user) => user.email === email);
  console.log(found);
  if (!found) {
    return { code: 201, token: '111222' };
  }
  return { code: 409, message: 'User already registered' };
};

module.exports = {
  verificaEmailUnico,
};