const express = require('express');

const OrderController = require('../controller/orderController');
// const authController = require('../helpers/jwtHelpers');
const { verifyAccessToken } = require('../helpers/jwtHelper');

const routes = express.Router();

routes.post('/addOrder', verifyAccessToken, OrderController.addOrder);
routes.get('/getOrders', verifyAccessToken, OrderController.getOrders);
routes.get('/getOrder/:id', verifyAccessToken, OrderController.getOrder);
routes.put('/updateOrder/:id', verifyAccessToken, OrderController.updateOrder);
routes.delete('/deleteOrder/:id', verifyAccessToken, OrderController.deleteOrder);

module.exports = routes;