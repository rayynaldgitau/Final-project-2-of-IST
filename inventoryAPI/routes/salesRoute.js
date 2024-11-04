const express = require('express');
const SalesController = require('../controller/salesController');
const { verifyAccessToken } = require('../helpers/jwtHelper');

const routes = express.Router();

routes.post('/addSale', SalesController.addSale);
routes.get('/getSales', SalesController.getSales);
routes.get('/getSale/:id', SalesController.getSale);
routes.put('/updateSale/:id', SalesController.updateSale);
routes.delete('/deleteSale/:id', SalesController.deleteSale);
routes.post('/makeSale', SalesController.makeSale);
module.exports = routes;
