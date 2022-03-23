const { Categories, BlogPosts } = require('../models/index');
const { verifyToken } = require('./auth');
const { existingUser } = require('./seviceUser');

const verifycategory = async (categories) => {
  const results = [];
  categories.map((cat) => results.push(Categories.findByPk(cat)));
  return Promise.all(results);
};
const createPost = async (post, token) => {
  const { title, content, categoriesIds } = post;
  const email = await verifyToken(token);
  const user = await existingUser(email);

  const completePost = {
    title,
    content,
    userId: user.id,
    categoriesIds,
  };

  return BlogPosts.create(completePost);
};

module.exports = { verifycategory, createPost };