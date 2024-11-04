module.exports = (sequelize, DataTypes) => {
     const Inventory = sequelize.define("inventory", {
          inventory_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          name: {
               type: DataTypes.STRING,
               allowNull: false
          },
          quantity: {
               type: DataTypes.INTEGER,
               allowNull: false
          },
          warehouse: {
               type: DataTypes.STRING,
               allowNull: false
          },
          location: {
               type: DataTypes.STRING,
               allowNull: false
          }
     });

     Inventory.associate = models => {
          Inventory.belongsTo(models.product, {
               foreignKey: 'product_id',
               as: 'product'
          });
     };

     return Inventory;
};
