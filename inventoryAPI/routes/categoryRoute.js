const express = require('express');

const CategoryController = require('../controller/categoryController');
// const authController = require('../helpers/jwtHelpers');
const { verifyAccessToken } = require('../helpers/jwtHelper');

const routes = express.Router();

routes.post('/addCategory', verifyAccessToken, CategoryController.addCategory);
routes.get('/getCategories', verifyAccessToken, CategoryController.getCategories);
routes.get('/getCategory/:id', verifyAccessToken, CategoryController.getCategory);
routes.put('/updateCategory/:id', verifyAccessToken, CategoryController.updateCategory);
routes.delete('/deleteCategory/:id', verifyAccessToken, CategoryController.deleteCategory);

module.exports = routes;