const express = require('express');

const CustomerController = require('../controller/customerController');
// const authController = require('../helpers/jwtHelpers');
const { verifyAccessToken } = require('../helpers/jwtHelper');

const routes = express.Router();

routes.post('/addCustomer', verifyAccessToken, CustomerController.addCustomer);
routes.get('/getCustomers', verifyAccessToken, CustomerController.getCustomers);
routes.get('/getCustomer/:id', verifyAccessToken, CustomerController.getCustomer);
routes.put('/updateCustomer/:id', verifyAccessToken, CustomerController.updateCustomer);
routes.delete('/deleteCustomer/:id', verifyAccessToken, CustomerController.deleteCustomer);

module.exports = routes;