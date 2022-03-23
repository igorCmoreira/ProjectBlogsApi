const { verifycategory } = require('../services/servicePost');

const titleValidation = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({ message: '"title" is required' });
  }
  next();
};
const contentValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ message: '"content" is required' });
  }
  next();
};
const categoryIdValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(400).send({ message: '"categoryIds" is required' });
  }
  const categories = await verifycategory(categoryIds);
for (let i = 0; i < categories.length; i += 1) {
  if (!categories[i]) {
    return res.status(400).send({ message: '"categoryIds" not found' });
  }
}
  next();
};

module.exports = {
  titleValidation,
  contentValidation,
  categoryIdValidation,
};
