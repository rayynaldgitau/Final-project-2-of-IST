const express = require('express');
const SalesController = require('../controller/salesController');
const { verifyAccessToken } = require('../helpers/jwtHelper');

const routes = express.Router();

routes.post('/addSale', SalesController.addSale);
routes.get('/getSales', SalesController.getSales);
routes.get('/getSale/:id', SalesController.getSales);
routes.put('/updateSale/:id', SalesController.updateSale);
routes.delete('/deleteSale/:id', SalesController.deleteSale);
routes.post('/makeSale', SalesController.addSale);
module.exports = routes;
