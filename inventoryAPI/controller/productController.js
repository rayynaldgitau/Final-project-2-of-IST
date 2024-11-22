
const db = require('../models/indexStart')
const { createError } = require('http-errors')


const product = db.products
const inventory = db.inventories


module.exports = {

     //add Product
     addProduct: async (req, res, next) => {

          try {
               const info = {

                    productName: req.body.productName,
                    productCategory: req.body.productCategory,
                    productDescription: req.body.productDescription,
                    productQuantity: req.body.productQuantity,
                    price: req.body.price
               }

               const addProduct = await product.create(info)
               res.status(201).send(addProduct)
          } catch (error) {
               next(error)
          }
     },

     //get Product by id
     getProduct: async (req, res, next) => {
          try {
               const id = req.params.id;

               // Ensure correct field name for the product ID (adjust if necessary)
               const foundProduct = await product.findOne({ where: { product_id: id } });

               if (!foundProduct) {
                    // If no product is found, return a 404 error
                    throw createError(404, "Product does not exist");
               }

               // Send the found product as the response
               res.status(200).send(foundProduct);
          } catch (error) {
               // Pass any errors to the error handling middleware
               next(error);
          }
     },

     //get all Products
     getAllProducts: async (req, res, next) => {
          try {
               const products = await product.findAll()
               res.status(200).send(products)
          } catch (error) {
               next(error)
          }
     },

     //update Product
     updateProduct: async (req, res, next) => {
          try {
               const id = req.params.id;

               // Check if the request body contains fields to update
               if (Object.keys(req.body).length === 0) {
                    return res.status(400).json({ message: 'No fields provided to update' });
               }

               // Perform the update
               const updated = await product.update(req.body, { where: { product_id: id } });

               // Check if the update affected any rows
               if (!updated[0]) {
                    return res.status(404).json({ message: 'Product not found or no changes made' });
               }

               // Fetch the updated product
               const updatedProduct = await product.findByPk(id);

               res.status(200).json({
                    message: 'Product updated successfully',
                    product: updatedProduct
               });
          } catch (error) {
               next(error);
          }
     },




     //delete Product
     deleteProduct: async (req, res, next) => {
          try {
               const id = req.params.id;

               const deleteItem = await product.destroy({ where: { product_id: id } });

               if (deleteItem === 0) {
                    throw createError(404, "Product not found");
               }

               res.status(200).json({ message: "Product deleted successfully" })
          } catch (error) {
               console.error(error);
               next(error);
          }
     },


     getProductz: async (req, res, next) => {
          try {
               const products = await products.findAll({
                    include: [{
                         model: inventory,
                         as: 'inventory',
                         attributes: ['quantity']
                    }]
               });

               res.status(200).send(products);
          } catch (error) {
               next(error);
          }
     },

     getProductPrice: async (req, res, next) => {
          try {
               const id = req.params.productId;

               // Fetch product by ID and include only the price 
               const productData = await product.findOne({
                    where: { product_id: id },
                    attributes: ['price'] // Only retrieve the price 
               });

               if (!productData) {
                    throw createError(404, "Product not found");
               }

               res.status(200).json({ price: productData.price });
          } catch (error) {
               next(error);
          }
     },




}

