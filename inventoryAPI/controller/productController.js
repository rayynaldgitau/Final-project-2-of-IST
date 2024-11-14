
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
               const id = req.params.id
               const product = await product.findOne({ where: { product_id: id } })

               if (!product) {
                    throw createError(404, "Product does not exist")
               }
               res.status(200).send(product)
          } catch (error) {
               next(error)
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
               const updated = await db.products.update(req.body, { where: { product_id: id } });

               if (!updated[0]) {
                    return res.status(404).json({ message: 'Product not found' });
               }

               const updatedProduct = await db.products.findByPk(id);
               res.status(200).json(updatedProduct);
          } catch (error) {
               next(error);
          }
     },


     //delete Product
     deleteProduct: async (req, res, next) => {
          try {
               const id = req.params.id

               await product.destroy({ where: { product_id: id } })
               res.status(200).send("Product Deleted Successfully")
          } catch (error) {
               next(error)
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
     }


}

