module.exports = (sequelize, DataTypes) => {
     const Sales = sequelize.define("sales", {
          sales_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          product_id: {
               type: DataTypes.INTEGER,
               references: {
                    model: 'products',
                    key: 'product_id'
               }
          },
          quantity_sold: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          sale_date: {
               type: DataTypes.DATEONLY,
               allowNull: false,
          },
          total_price: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
     });

     // Optional: Associations with other models
     Sales.associate = models => {
          Sales.belongsTo(models.product, {
               foreignKey: 'product_id',
               as: 'product'
          });
     };

     return Sales;
};
