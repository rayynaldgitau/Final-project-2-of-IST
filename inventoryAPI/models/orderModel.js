module.exports = (sequelize, DataTypes) => {

     const Order = sequelize.define("order", {
          order_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,

          },
          customerName: {
               type: DataTypes.STRING,
               allowNull: false
          },
          customerEmail: {
               type: DataTypes.STRING,
               allowNull: false,
               validate: {
                    isEmail: true
               }
          },
          orderStatus: {
               type: DataTypes.STRING,
               allowNull: false
          },
          totalAmount: {
               type: DataTypes.STRING,
               allowNull: false
          },
          paymentMethod: {
               type: DataTypes.STRING,
               allowNull: false
          },
          orderDate: {
               type: DataTypes.DATE,
               allowNull: false,
               defaultValue: DataTypes.NOW
          },

     });

     return Order

}