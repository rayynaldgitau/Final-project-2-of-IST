const Customer = require('../models/customerModel')
const { createError } = require('http-errors')

module.exports = {

     //add Customer
     addCustomer: async (req, res, next) => {

          try {
               const info = {
                    customerName: req.body.customerName,
                    customerEmail: req.body.customerEmail,
                    customerPhone: req.body.customerPhone,
                    customerAddress: req.body.customerAddress
               }

               const addCustomer = await Customer.create(info)
               res.status(200).send(addCustomer)
          } catch (error) {
               next(error)
          }
     },

     //get Customer by id
     getCustomer: async (req, res, next) => {
          try {
               const id = req.params.id
               const customer = await Customer.findOne({ where: { customer_id: id } })

               if (!customer) {
                    throw createError(404, "Customer does not exist")
               }
               res.status(200).send(customer)
          } catch (error) {
               next(error)
          }
     },

     //get all Customers
     getCustomers: async (req, res, next) => {
          try {
               const customers = await Customer.findAll()
               res.status(200).send(customers)
          } catch (error) {
               next(error)
          }
     },

     //update Customer
     updateCustomer: async (req, res, next) => {

          try {
               const id = req.params.id

               const [updated] = await Customer.update(req.body, { where: { customer_id: id } })
               if (!updated) {
                    throw createError(404, "Customer does not exist")
               }
               const updatedCustomer = await Customer.findOne({ where: { customer_id: id } })
               res.status(200).send(updatedCustomer)
          } catch (error) {
               next(error)
          }
     },

     //delete Customer
     deleteCustomer: async (req, res, next) => {
          try {
               const id = req.params.id

               await Customer.destroy({ where: { customer_id: id } })
               res.status(200).send("Customer Deleted Successfully")
          } catch (error) {
               next(error)
          }
     },
}