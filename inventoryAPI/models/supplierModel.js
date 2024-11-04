module.exports = (sequelize, DataTypes) => {

     const supplier = sequelize.define("supplier", {
          supplier_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,

          },
          name: {
               type: DataTypes.STRING,
               allowNull: false
          },

          email: {
               type: DataTypes.STRING,
               allowNull: false
          },

          phone: {
               type: DataTypes.STRING,
               allowNull: false
          },

     });

     return supplier

}