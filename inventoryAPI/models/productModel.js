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
               allowNull: false,
               defaultValue: 0,
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

     product.associate = models => {
          product.hasMany(models.sales, {
               foreignKey: 'product_id',
               as: 'sales' // Optional alias for referencing sales associated with product
          });
     };

     return product

}