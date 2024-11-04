const OrderItem = require('../models/orderItemModel')
const Product = require('../models/productModel')
const Order = require('../models/orderModel')
const { createError } = require('http-errors')

module.exports = {

     //add Order Item
     addOrderItem: async (req, res, next) => {

          try {
               const order_id = req.params.order_id
               const product_id = req.params.product_id

               const [order, product] = await Promise.all([
                    Order.findOne({ where: { order_id: order_id } }),
                    Product.findOne({ where: { product_id: product_id } })
               ])

               if (!order) {
                    throw createError(404, "Order does not exist")
               }

               if (!product) {
                    throw createError(404, "Product does not exist")
               }

               const orderItemInfo = {
                    order_id: order_id,
                    product_id: product_id,
                    quantity: req.body.quantity,
                    price: product.price
               }

               const orderItem = await OrderItem.create(orderItemInfo)
               res.status(200).send(orderItem)
          } catch (error) {
               next(error)
          }
     },

     //get Order Item by id
     getOrderItem: async (req, res, next) => {
          try {
               const id = req.params.id
               const orderItem = await OrderItem.findOne({ where: { order_item_id: id } })

               if (!orderItem) {
                    throw createError(404, "Order Item does not exist")
               }
               res.status(200).send(orderItem)
          } catch (error) {
               next(error)
          }
     },

     //get all Order Items by Order id
     getOrderItems: async (req, res, next) => {
          try {
               const order_id = req.params.order_id
               const orderItems = await OrderItem.findAll({ where: { order_id: order_id } })
               res.status(200).send(orderItems)
          } catch (error) {
               next(error)
          }
     },

     //update Order Item
     updateOrderItem: async (req, res, next) => {

          try {
               const id = req.params.id

               const [updated] = await OrderItem.update(req.body, { where: { order_item_id: id } })
               if (!updated) {
                    throw createError(404, "Order Item does not exist")
               }
               const updatedOrderItem = await OrderItem.findOne({ where: { order_item_id: id } })
               res.status(200).send(updatedOrderItem)
          } catch (error) {
               next(error)
          }
     },

     //delete Order Item
     deleteOrderItem: async (req, res, next) => {
          try {
               const id = req.params.id

               await OrderItem.destroy({ where: { order_item_id: id } })
               res.status(200).send("Order Item Deleted Successfully")
          } catch (error) {
               next(error)
          }
     },
}