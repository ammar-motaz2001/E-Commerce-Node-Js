import slugify from "slugify"
import { errorHandling } from "../../middleware/catchError.js"
import { productModel } from "../../database/models/product.model.js"
import { json } from "express"
import { ApiFeatures } from "../../utils/ApiFeatures.js"


const addProduct=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    req.body.imgCover=req.files.imgCover[0].filename
     req.body.images=req.files.images.map((img)=> img.filename)
    let product=new productModel(req.body)
    await product.save()
    res.json({message:"product added Successfully",product})
})

const getAllProducts=errorHandling(async(req,res,next)=>{
    
   let apiFeatures=new ApiFeatures(productModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allProducts= await apiFeatures.mongooseQuery
     res.json({message:"success",page:apiFeatures.pageNumber,allProducts})
 })

const getSingleProduct=errorHandling(async(req,res,next)=>{
    let product=await productModel.findById(req.params.id)
    !product && res.status(404).json({message:"product Not Found "})
     product && res.json({message:"success",product})
})

const updateProduct=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.title)
    if(req.files.imgCover) req.body.imgCover=req.files.imgCover[0].filename
    if(req.files.images) req.body.images=req.files.images.map((img)=> img.filename)
    let product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !product && res.status(404).json({message:"product Not Found "})
     product  && res.json({message:"updated Successfully",product})
})
const deleteProduct=errorHandling(async(req,res,next)=>{
    let product=await productModel.findByIdAndDelete(req.params.id)
    !product && res.status(404).json({message:"product Not Found "})
     product && res.json({message:"deleted Successfully",product})
})

export{
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}