module.exports = (sequelize, DataTypes) => {

     const Customer = sequelize.define("customer", {
          customer_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               autoIncrement: true,
          },
          firstName: {
               type: DataTypes.STRING,
               allowNull: false
          },
          lastName: {
               type: DataTypes.STRING,
               allowNull: false
          },
          email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true
          },
          phoneNumber: {
               type: DataTypes.STRING,
               allowNull: false
          },
          address: {
               type: DataTypes.STRING,
               allowNull: false
          },
          city: {
               type: DataTypes.STRING,
               allowNull: false
          },
          state: {
               type: DataTypes.STRING,
               allowNull: false
          },
          zipCode: {
               type: DataTypes.STRING,
               allowNull: false
          }
     });

     return Customer

}