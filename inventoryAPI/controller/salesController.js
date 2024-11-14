// controller/salesController.js
const { createError } = require('http-errors');
const db = require('../models/indexStart');
const Sales = db.sales;

module.exports = {
     // Get all sales with product details
     getSales: async (req, res, next) => {
          try {
               const sales = await Sales.findAll({
                    include: [{
                         model: db.products,
                         as: 'product',  // Alias defined in Sales model
                         attributes: ['product_id', 'productName', 'price'],  // Only get necessary product fields
                    }],
               });

               res.status(200).json({
                    success: true,
                    data: sales,
               });
          } catch (error) {
               console.error('Error fetching sales:', error);
               next(error);
          }
     },

     // Add a sale
     addSale: async (req, res, next) => {
          try {
               const { product_id, quantity_sold, sale_date, total_price } = req.body;

               const sale = await Sales.create({
                    product_id,
                    quantity_sold,
                    sale_date,
                    total_price,
               });

               res.status(201).send(sale);
          } catch (error) {
               next(error);
          }
     },

     // Update sale
     updateSale: async (req, res, next) => {
          try {
               const { id } = req.params;
               const { body } = req;

               const [updated] = await Sales.update(body, {
                    where: { sales_id: id },
               });

               if (!updated) {
                    throw createError(404, 'Sale not found');
               }

               const updatedSale = await Sales.findOne({
                    where: { sales_id: id },
                    include: [{
                         model: db.products,
                         as: 'product',
                    }],
               });

               res.status(200).send(updatedSale);
          } catch (error) {
               next(error);
          }
     },

     // Delete sale
     deleteSale: async (req, res, next) => {
          try {
               const id = req.params.id;

               const sale = await Sales.findByPk(id);

               if (!sale) {
                    return res.status(404).send('Sale item not found');
               }

               await sale.destroy();
               res.status(200).send(`Sale item with ID ${id} deleted successfully`);
          } catch (error) {
               console.error(error);
               next(error);
          }
     },

     makeSale: async (req, res, next) => {
          const { product_id, quantity_sold } = req.body;

          // Check for valid input
          if (!product_id || !quantity_sold) {
               return res.status(400).json({ message: 'Missing required fields' });
          }

          const t = await db.sequelize.transaction();

          try {
               // Find the product and lock it to prevent concurrent updates
               const product = await db.products.findByPk(product_id, { lock: t.LOCK.UPDATE, transaction: t });

               if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
               }

               if (product.productQuantity < quantity_sold) {
                    return res.status(400).json({ message: 'Not enough stock available' });
               }

               // Update the product quantity
               product.productQuantity -= quantity_sold;
               await product.save({ transaction: t });

               // Create the sale entry in the Sales table
               const total_price = product.price * quantity_sold;
               const sale = await Sales.create({
                    product_id,
                    quantity_sold,
                    sale_date: new Date(),  // Current date
                    total_price,
               }, { transaction: t });

               // Commit the transaction
               await t.commit();

               return res.status(200).json({
                    message: 'Sale created successfully',
                    sale,
                    updatedProductQuantity: product.productQuantity
               });
          } catch (error) {
               await t.rollback();  // Rollback in case of error
               console.error('Error making the sale:', error);
               return res.status(500).json({ message: 'Error making the sale' });
          }
     }
};
