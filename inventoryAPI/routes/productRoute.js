const express = require('express');
const ProductController = require('../controller/productController.js')
// const authController = require('../helpers/jwtHelpers')
const { verifyAccessToken } = require('../helpers/jwtHelper');
const productController = require('../controller/productController.js');
const routes = express.Router()

routes.post('/addProduct', ProductController.addProduct)
routes.get('/getProduct/:id', ProductController.getProduct)
routes.get('/getProducts', ProductController.getProducts)
routes.put('/updateProduct/:id', ProductController.updateProduct)
routes.delete('/deleteProduct/:id', ProductController.deleteProduct)
routes.get('/getProductz', productController.getProductz)

module.exports = routes;