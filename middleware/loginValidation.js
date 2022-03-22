const { existingUser } = require('../services/seviceUser');

const BAD_REQUEST = 400;
const passwordVerify = (req, res, next) => {
const { password } = req.body;
if (password === undefined) {
  return res.status(BAD_REQUEST).send({ message: '"password" is required' });
}
if (password.length === 0) {
  return res.status(BAD_REQUEST).send({ message: '"password" is not allowed to be empty' });
}
next();
};
const emailVerify = (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (email.length === 0) {
    return res.status(BAD_REQUEST).send({ message: '"email" is not allowed to be empty' });
  }

  next();
};
const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  const data = await existingUser(email);
  console.log(data);
  if (!data) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
  }
  if (data.dataValues.password !== password) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid fields' });
  }
  next();
};
module.exports = { 
  passwordVerify,
  emailVerify,
  verifyUser,
 };