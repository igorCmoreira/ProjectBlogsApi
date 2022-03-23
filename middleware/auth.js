const { verifyToken } = require('../services/auth');

const authToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'Token not found' });
    }
    const decoded = await verifyToken(authorization);
    if (!decoded) {
      return res.status(401).send({ message: 'Expired or invalid token' });
    }
  next();
  } catch (e) {
    next(e);
  }
};
module.exports = { authToken };