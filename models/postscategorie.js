module.exports = (sequelize) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, 
  { tableName: 'PostsCategories', timestamps: false });
  PostsCategories.associate = (models) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'postsIds',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };
  return PostsCategories;
};
