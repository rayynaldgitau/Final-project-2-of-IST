const express = require('express');
const { verifyAccessToken } = require('../helpers/jwtHelper');
const inventoryController = require('../controller/inventoryController');

const routes = express.Router();

routes.post('/addInventory', inventoryController.addInventory);
routes.get('/getInventories', inventoryController.getInventories);
routes.get('/getInventory/:id', inventoryController.getInventory);
routes.put('/updateInventory/:id', inventoryController.updateInventory);
routes.delete('/deleteInventory/:id', inventoryController.deleteInventory);
routes.get('/getInventoryQuantity/:id', inventoryController.getInventoryQuantity); // Removed extra forward slash before 'id'

module.exports = routes;
