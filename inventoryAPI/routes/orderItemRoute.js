const express = require('express');
const { verifyAccessToken } = require('../helpers/jwtHelper')

const OrderItemController = require('../controller/orderItemController');
const routes = express.Router();

routes.post('/addOrderItem', verifyAccessToken, OrderItemController.addOrderItem);
routes.get('/getOrderItems', verifyAccessToken, OrderItemController.getOrderItems);
routes.get('/getOrderItem/:id', verifyAccessToken, OrderItemController.getOrderItem);
routes.put('/updateOrderItem/:id', verifyAccessToken, OrderItemController.updateOrderItem);
routes.delete('/deleteOrderItem/:id', verifyAccessToken, OrderItemController.deleteOrderItem);

module.exports = routes;