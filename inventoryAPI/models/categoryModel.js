module.exports = (sequelize, DataTypes) => {

     const Category = sequelize.define("category", {
          category_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          categoryName: {
               type: DataTypes.STRING,
               allowNull: false
          },
          categoryDescription: {
               type: DataTypes.STRING,
               allowNull: false
          },
     });

     return Category

}