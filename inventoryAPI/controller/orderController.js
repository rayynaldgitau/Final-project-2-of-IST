const Order = require('../models/orderModel')
const { createError } = require('http-errors')

module.exports = {

     //add Order
     addOrder: async (req, res, next) => {

          try {
               const info = {
                    customerName: req.body.customerName,
                    customerEmail: req.body.customerEmail,
                    orderStatus: req.body.orderStatus,
                    totalAmount: req.body.totalAmount,
                    paymentMethod: req.body.paymentMethod,
               }

               const addOrder = await Order.create(info)
               res.status(200).send(addOrder)
          } catch (error) {
               next(error)
          }
     },

     //get Order by id
     getOrder: async (req, res, next) => {
          try {
               const id = req.params.id
               const order = await Order.findOne({ where: { order_id: id } })

               if (!order) {
                    throw createError(404, "Order does not exist")
               }
               res.status(200).send(order)
          } catch (error) {
               next(error)
          }
     },

     //get all Orders
     getOrders: async (req, res, next) => {
          try {
               const orders = await Order.findAll()
               res.status(200).send(orders)
          } catch (error) {
               next(error)
          }
     },

     //update Order
     updateOrder: async (req, res, next) => {

          try {
               const id = req.params.id

               const [updated] = await Order.update(req.body, { where: { order_id: id } })
               if (!updated) {
                    throw createError(404, "Order does not exist")
               }
               const updatedOrder = await Order.findOne({ where: { order_id: id } })
               res.status(200).send(updatedOrder)
          } catch (error) {
               next(error)
          }
     },

     //delete Order
     deleteOrder: async (req, res, next) => {
          try {
               const id = req.params.id

               await Order.destroy({ where: { order_id: id } })
               res.status(200).send("Order Deleted Successfully")
          } catch (error) {
               next(error)
          }
     },
}