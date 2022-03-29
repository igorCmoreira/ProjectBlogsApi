const blogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignkey: true },
    published: { type: DataTypes.DATE, defaultValue: sequelize.fn('NOW') },
    updated: { type: DataTypes.DATE, defaultValue: sequelize.fn('NOW') },
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignkey: 'userId', as: 'user',
    });
  };
  return BlogPost;
};

module.exports = blogPost;