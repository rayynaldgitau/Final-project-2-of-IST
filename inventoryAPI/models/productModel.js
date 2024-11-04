module.exports = (sequelize, DataTypes) => {

     const product = sequelize.define("product", {
          product_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,

          },

          productName: {
               type: DataTypes.STRING,
               allowNull: false
          },


          productQuantity: {
               type: DataTypes.INTEGER,
               allowNull: false
          },

          price: {
               type: DataTypes.INTEGER,
               allowNull: false
          },


     });

     product.associate = models => {
          product.hasOne(models.inventory, {
               foreignKey: 'product_id',
               as: 'inventory'
          });
     };

     return product

}