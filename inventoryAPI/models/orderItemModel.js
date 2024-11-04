module.exports = (sequelize, DataTypes) => {
     const OrderItem = sequelize.define("orderItem", {
          orderItemId: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          order_Id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "orders",
                    key: "order_id",
               },
          },
          product_Id: {
               type: DataTypes.INTEGER,
               references: {
                    model: "products",
                    key: "product_id",
               },
          },
          quantity: {
               type: DataTypes.INTEGER,
               allowNull: false,
          },
          unitPrice: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
          subtotal: {
               type: DataTypes.DECIMAL(10, 2),
               allowNull: false,
          },
     });

     return OrderItem;
};