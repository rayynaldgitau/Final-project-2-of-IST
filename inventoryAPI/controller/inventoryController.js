const { createError } = require('http-errors');
const db = require('../models/indexStart');

// Use the model
const Inventory = db.inventories; // Renamed from 'inventory' to 'Inventory' for consistency

module.exports = {
     // Add Inventory
     addInventory: async (req, res, next) => {
          try {
               const info = {
                    product_id: req.body.product_id,
                    name: req.body.name,
                    quantity: req.body.quantity,
                    warehouse: req.body.warehouse,
                    location: req.body.location
               };

               const addedInventory = await Inventory.create(info); // Renamed from 'addInventory' to 'addedInventory' for clarity
               res.status(200).send(addedInventory);
          } catch (error) {
               next(error);
          }
     },

     // Get Inventory by id
     getInventory: async (req, res, next) => {
          try {
               const id = req.params.id;
               const inventoryItem = await Inventory.findOne({ where: { inventory_id: id } });

               if (!inventoryItem) {
                    throw createError(404, "Inventory does not exist");
               }
               res.status(200).send(inventoryItem);
          } catch (error) {
               next(error);
          }
     },

     // Get all inventories
     getInventories: async (req, res, next) => {
          try {
               const inventories = await Inventory.findAll();
               res.status(200).json({
                    success: true,
                    data: inventories
               });
          } catch (error) {
               console.error('Error fetching inventories:', error);
               next(error);
          }
     },

     // Update Inventory
     updateInventory: async (req, res, next) => {
          try {
               const { id } = req.params;
               const { body } = req;

               const [updatedRows] = await Inventory.update(body, { where: { inventory_id: id } }); // Renamed from 'updated' to 'updatedRows'

               if (updatedRows === 0) { // Check if no rows were updated
                    throw createError(404, "Inventory does not exist or was not updated");
               }

               const updatedInventory = await Inventory.findOne({ where: { inventory_id: id } });
               res.status(200).send(updatedInventory);
          } catch (error) {
               next(error);
          }
     },

     // Delete Inventory
     deleteInventory: async (req, res, next) => {
          try {
               const id = req.params.id;

               if (!id) {
                    return res.status(400).send("Inventory ID is required");
               }

               const inventoryItem = await Inventory.findByPk(id);

               if (!inventoryItem) {
                    return res.status(404).send("Inventory item not found");
               }

               await inventoryItem.destroy();
               res.status(200).send(`Inventory item with ID ${id} deleted successfully`);
          } catch (error) {
               console.error(error);
               next(error);
          }
     },

     // Get Inventory Quantity by Product ID
     getInventoryQuantity: async (req, res, next) => {
          try {
               const id = req.params.id;
               const inventoryItem = await Inventory.findOne({ where: { product_id: id } });

               if (!inventoryItem) {
                    throw createError(404, "Inventory does not exist");
               }

               const quantity = inventoryItem.quantity;
               res.status(200).send({ product_id: id, quantity });
          } catch (error) {
               next(error);
          }
     }
};

