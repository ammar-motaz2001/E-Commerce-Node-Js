
import express from "express"
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "./category.controller.js"
import { validation } from "../../middleware/validation.js"
import { addCategoryVal, paramsIdVal } from "../../middleware/category.validation.js"
import { uploadSingleFile } from "../../middleware/upload.js"
import subcategoryRouter from "../subcategory/subcategory.routes.js"
import { allowUsers, protectedRoutes } from "../auth/auth.controller.js"

const categoryRouter=express.Router()
categoryRouter.use('/categories/:category',subcategoryRouter)
categoryRouter
.route("/categories")
.post(protectedRoutes,allowUsers('admin'),uploadSingleFile('img'),validation(addCategoryVal),addCategory)
.get(getAllCategories)
categoryRouter.route('/categories/:id')
.get(validation(paramsIdVal),getSingleCategory)
.put(protectedRoutes,allowUsers("admin"),validation(updateCategory),updateCategory)
.delete(protectedRoutes,allowUsers("admin"),validation(paramsIdVal),deleteCategory)
export default categoryRouter