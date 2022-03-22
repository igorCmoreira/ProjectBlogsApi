const BAD_REQUEST = 400;
const verificaPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(BAD_REQUEST).send({ message: '"password" is required' });
  }
  if (password.length !== 6) {
    return res.status(BAD_REQUEST).send({ message: '"password" length must be 6 characters long' });
  }
  next();
};
const verificaName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(BAD_REQUEST)
      .send({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};
const verificaEmail = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /\S+@\S+\.\S+/;
  if (email === undefined || email.length === 0) {
    return res.status(BAD_REQUEST).send({ message: '"email" is required' });
  }
  if (!regexEmail.test(email)) {
   return res.status(BAD_REQUEST)
     .send({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = {
  verificaName,
  verificaEmail,
  verificaPassword,
};
