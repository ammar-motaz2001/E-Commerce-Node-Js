
import express from "express"
import { paramsIdVal } from "../../middleware/category.validation.js"
import { validation } from "../../middleware/validation.js"
import { addsubCategoryVal, updatesubCategory } from "../../middleware/subcategory.validation.js"
import { addsubCategory, deletesubCategory, getAllsubCategories, getSinglesubCategory, updatesubCategories } from "./subcategory.controller.js"
const subcategoryRouter=express.Router({mergeParams:true})
subcategoryRouter.route("/subcategories")
.post(validation(addsubCategoryVal),addsubCategory)
.get(getAllsubCategories)
subcategoryRouter.route('/subcategories/:id')
.get(validation(paramsIdVal),getSinglesubCategory)
.put(validation(updatesubCategory),updatesubCategories)
.delete(validation(paramsIdVal),deletesubCategory)
export default subcategoryRouter