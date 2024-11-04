const db = require('../models/indexStart');
const { createError } = require('http-errors');

// Use the model
const Supplier = db.suppliers;

module.exports = {

     // Add Supplier
     addSupplier: async (req, res, next) => {

          try {
               const info = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
               };

               const addSupplier = await Supplier.create(info);
               res.status(200).send(addSupplier);
          } catch (error) {
               next(error);
          }
     },

     // Get Supplier by id
     getSupplier: async (req, res, next) => {
          try {
               const id = req.params.id;
               const supplier = await Supplier.findOne({ where: { supplier_id: id } });

               if (!supplier) {
                    throw createError(404, "Supplier does not exist");
               }
               res.status(200).send(supplier);
          } catch (error) {
               next(error);
          }
     },

     getSuppliers: async (req, res, next) => {
          try {
               const suppliers = await Supplier.findAll()
               res.status(200).send(suppliers)
          } catch (error) {
               next(error)
          }
     },

     // Update Supplier
     updateSupplier: async (req, res, next) => {
          try {
               const id = req.params.id;

               const [updated] = await Supplier.update(req.body, { where: { supplier_id: id } });
               if (!updated) {
                    return res.status(404).send("Supplier does not exist");
               }

               const updatedSupplier = await Supplier.findOne({ where: { supplier_id: id } });
               res.status(200).send(updatedSupplier);
          } catch (error) {
               next(error);
          }
     },


     // Delete Supplier
     deleteSupplier: async (req, res, next) => {
          try {
               const id = req.params.id;

               await Supplier.destroy({ where: { supplier_id: id } });
               res.status(200).send("Supplier Deleted Successfully");
          } catch (error) {
               next(error);
          }
     },
};
