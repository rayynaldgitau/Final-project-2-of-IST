const Category = require('../models/categoryModel')
const { createError } = require('http-errors')

module.exports = {

     //add Category
     addCategory: async (req, res, next) => {

          try {
               const info = {
                    categoryName: req.body.categoryName,
                    categoryDescription: req.body.categoryDescription
               }

               const addCategory = await Category.create(info)
               res.status(200).send(addCategory)
          } catch (error) {
               next(error)
          }
     },

     //get Category by id
     getCategory: async (req, res, next) => {
          try {
               const id = req.params.id
               const category = await Category.findOne({ where: { category_id: id } })

               if (!category) {
                    throw createError(404, "Category does not exist")
               }
               res.status(200).send(category)
          } catch (error) {
               next(error)
          }
     },

     //get all Categories
     getCategories: async (req, res, next) => {
          try {
               const categories = await Category.findAll()
               res.status(200).send(categories)
          } catch (error) {
               next(error)
          }
     },

     //update Category
     updateCategory: async (req, res, next) => {

          try {
               const id = req.params.id

               const [updated] = await Category.update(req.body, { where: { category_id: id } })
               if (!updated) {
                    throw createError(404, "Category does not exist")
               }
               const updatedCategory = await Category.findOne({ where: { category_id: id } })
               res.status(200).send(updatedCategory)
          } catch (error) {
               next(error)
          }
     },

     //delete Category
     deleteCategory: async (req, res, next) => {
          try {
               const id = req.params.id

               await Category.destroy({ where: { category_id: id } })
               res.status(200).send("Category Deleted Successfully")
          } catch (error) {
               next(error)
          }
     },
}