const { BlogPosts, Categories } = require('../models/index');
const { verifyToken } = require('./auth');
const { existingUser } = require('./seviceUser');

const createPost = async (post, token) => {
  const { title, content, categoryIds } = post;
  const email = await verifyToken(token);
  const user = await existingUser(email);

  const completePost = {
    title,
    content,
    userId: user.id,
  };
  const postBlog = await BlogPosts.create(completePost);
  const categories = await Categories.findAll({ where: {
    id: categoryIds,
  } });
await postBlog.addCategories(categories);
  return postBlog;
};

module.exports = { createPost };