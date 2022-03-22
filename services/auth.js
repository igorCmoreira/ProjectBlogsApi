const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  algorithm: 'HS256',
};

const genAuthToken = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.email;

    return user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  genAuthToken,
  verifyToken,
};