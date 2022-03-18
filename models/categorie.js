const categorie = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
  });
  return Categorie;
};

module.exports = categorie;