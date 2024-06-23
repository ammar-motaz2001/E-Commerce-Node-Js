
import express from "express"
import { validation } from "../../middleware/validation.js"
import { paramsIdVal } from "../../middleware/category.validation.js"
import { uploadSingleFile } from "../../middleware/upload.js"
import { addBrandsVal, updateBrands } from "../../middleware/brands.validation.js"
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js"

const brandsRouter=express.Router()

brandsRouter.route("/brands")
.post(uploadSingleFile('logo'),validation(addBrandsVal),addBrand)
.get(getAllBrands)

brandsRouter.route('/brands/:id')
.get(validation(paramsIdVal),getSingleBrand)
.put(uploadSingleFile('logo'),validation(updateBrands),updateBrand)
.delete(validation(paramsIdVal),deleteBrand)
export default brandsRouter