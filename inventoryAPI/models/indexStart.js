const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
     dbConfig.DB,
     dbConfig.USER,
     dbConfig.PASSWORD,
     {
          host: dbConfig.HOST,
          dialect: dbConfig.dialect
          // Removed operatorsAliases, as it's deprecated
     }
);

sequelize.authenticate()
     .then(() => {
          console.log('Database connection successful...');
     })
     .catch(err => {
          console.error('Error connecting to the database:', err);
     });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.categories = require('./categoryModel')(sequelize, DataTypes);
db.customers = require('./customerModel')(sequelize, DataTypes);
db.inventories = require('./inventoryModel')(sequelize, DataTypes);
db.orders = require('./orderModel')(sequelize, DataTypes);
db.orderItems = require('./orderItemModel')(sequelize, DataTypes);
db.products = require('./productModel')(sequelize, DataTypes);
db.suppliers = require('./supplierModel.js')(sequelize, DataTypes);
db.sales = require('./salesModel.js')(sequelize, DataTypes);
db.users = require('./auth.model.js')(sequelize, DataTypes);

// Define relationships
// db.products.hasOne(db.inventories, {
//      foreignKey: 'product_id',
//      as: 'inventory'
// });

// db.inventories.belongsTo(db.products, {
//      foreignKey: 'product_id',
//      as: 'product'
// });

// Define other relationships here...

sequelize.sync({ force: false })
     .then(() => {
          console.log('Database models synchronized');
     });

module.exports = db;

