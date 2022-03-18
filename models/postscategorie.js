module.exports = (sequelize) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, 
  { tableName: 'PostsCategories' });
  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'postId',
      through: PostsCategories,
      foreignKey: 'id',
      otherKey: 'id',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categoryId',
      through: PostsCategories,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };
  return PostsCategories;
};
