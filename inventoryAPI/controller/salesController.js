const { createError } = require('http-errors');
const db = require('../models/indexStart');

// Use the Sales model
const Sales = db.sales;

module.exports = {
     // Add Sale
     addSale: async (req, res, next) => {
          try {
               const info = {
                    product_id: req.body.product_id,
                    quantity_sold: req.body.quantity_sold,
                    sale_date: req.body.sale_date,
                    total_price: req.body.total_price
               };

               const sale = await Sales.create(info);
               res.status(200).send(sale);
          } catch (error) {
               next(error);
          }
     },

     // Get Sale by id
     getSale: async (req, res, next) => {
          try {
               const id = req.params.id;
               const sale = await Sales.findOne({ where: { sales_id: id } });

               if (!sale) {
                    throw createError(404, "Sale does not exist");
               }
               res.status(200).send(sale);
          } catch (error) {
               next(error);
          }
     },

     // Get all Sales
     getSales: async (req, res, next) => {
          try {
               const sales = await Sales.findAll();
               res.status(200).json({
                    success: true,
                    data: sales
               });
          } catch (error) {
               console.error('Error fetching sales:', error); // Logging the error
               next(error);
          }
     },

     // Update Sale
     updateSale: async (req, res, next) => {
          try {
               const { id } = req.params;
               const { body } = req;

               const [updated] = await Sales.update(body, { where: { sales_id: id } });

               if (!updated) {
                    throw createError(404, "Sale does not exist");
               }

               const updatedSale = await Sales.findOne({ where: { sales_id: id } });

               if (!updatedSale) {
                    res.status(404).send({ message: "Sale ID not found" });
               } else {
                    res.status(200).send(updatedSale);
               }
          } catch (error) {
               next(error);
          }
     },
     // Delete Sale
     deleteSale: async (req, res, next) => {
          try {
               const id = req.params.id;

               if (!id) {
                    return res.status(400).send("Sale ID is required");
               }

               const saleItem = await Sales.findByPk(id);

               if (!saleItem) {
                    return res.status(404).send("Sale item not found");
               }

               await saleItem.destroy();
               res.status(200).send(`Sale item with ID ${id} deleted successfully`);
          } catch (error) {
               console.error(error);
               next(error);
          }
     },
     makeSale: async (req, res, next) => {
          try {
               const { productId, quantitySold } = req.body;

               if (!productId || !quantitySold) {
                    return res.status(400).send("Product ID and quantity sold are required");
               }

               const newSale = await Sales.create({
                    productId,
                    quantitySold
               });

               res.status(201).send(`Sale created successfully with ID ${newSale.id}`);
          } catch (error) {
               console.error(error);
               next(error);
          }
     },
};
