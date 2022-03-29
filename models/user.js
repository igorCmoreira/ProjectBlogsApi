module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
  });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, 
      { foreingKey: 'id', as: 'userId' });
  };
  return User;
};
