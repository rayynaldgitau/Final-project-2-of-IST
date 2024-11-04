const express = require('express');
// const authController = require('../helpers/jwtHelpers')
const { verifyAccessToken } = require('../helpers/jwtHelper');

const supplierController = require('../controller/supplierController')

const routes = express.Router()

routes.post('/addSupplier', supplierController.addSupplier);
routes.get('/getSuppliers', supplierController.getSuppliers);
routes.get('/addSupplier/:id', supplierController.getSupplier);
routes.put('/updateSupplier/:id', supplierController.updateSupplier);
routes.delete('/deleteSupplier/:id', supplierController.deleteSupplier);

module.exports = routes;