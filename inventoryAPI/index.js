const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
require("./models/indexStart");
const app = express();

const corsOptions = {
     origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json()); // Parse JSON bodies


// Importing Routes
const supplierRoute = require('./routes/supplierRoute');
const categoryRoute = require('./routes/categoryRoute');
const customerRoute = require('./routes/customerRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const orderRoute = require('./routes/orderRoute');
const orderItemRoute = require('./routes/orderItemRoute');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute');
const salesRoute = require('./routes/salesRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registering Routes
app.use('/Suppliers', supplierRoute);
app.use('/Categories', categoryRoute);
app.use('/Customers', customerRoute);
app.use('/Inventories', inventoryRoute);
app.use('/Orders', orderRoute);
app.use('/OrderItems', orderItemRoute);
app.use('/Products', productRoute);
app.use('/api/auth', authRoute);
app.use('/Sales', salesRoute);

const PORT = process.env.PORT || 4001;

// Error Handler
app.use((err, req, res, next) => {
     res.status(err.status || 500);
     res.send({
          error: {
               status: err.status || 500,
               message: err.message,
          },
     });
});

app.listen(PORT, () => {
     console.log(`Listening on: http://localhost:${PORT}`);
});

// http://localhost:4001/Inventories/getInventory
