const { BlogPosts, Categories, User } = require('../models/index');
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
const findAll = async () => BlogPosts.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Categories, as: 'categories', through: { attributes: [] } }],
  });
const findById = async (id) => BlogPosts.findByPk(id, {
  include: [
    { model: User, as: 'user' },
    { model: Categories, as: 'categories', through: { attributes: [] } }],
});
const update = async (title, content, post) => post.update({ title, content });
const del = async (post) => post.destroy();

module.exports = { createPost, findAll, findById, update, del };