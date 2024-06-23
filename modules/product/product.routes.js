
import express from "express"
import { validation } from "../../middleware/validation.js"
import { uploadfields } from "../../middleware/upload.js"
import { addProductVal, paramsIdVal, updateProductsVal } from "../../middleware/product.validation.js"
import { addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "./product.controller.js"

const productRouter=express.Router()

productRouter.route("/products")
.post(uploadfields([
    {name:"imgCover",maxCount:1},
    {name:"images",maxCount:10},
]),validation(addProductVal),addProduct)
.get(getAllProducts)

productRouter.route('/products/:id')
.get(validation(paramsIdVal),getSingleProduct)
.put(uploadfields([
    {name:"imgCover",maxCount:1},
    {name:"images",maxCount:10},
]),validation(updateProductsVal),updateProduct)
.delete(validation(paramsIdVal),deleteProduct)
export default productRouter