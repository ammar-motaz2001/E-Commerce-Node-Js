import { categoryModel } from "../../database/models/category.model.js"
import slugify from "slugify"
import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addCategory=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.img=req.file.filename
    let category=new categoryModel(req.body)
    await category.save()
    res.json({message:"Category added Successfully",category})
})

const getAllCategories=errorHandling(async(req,res,next)=>{
    let apiFeatures=new ApiFeatures(categoryModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allCategories= await apiFeatures.mongooseQuery
     res.json({message:"success",allCategories})
 })

const getSingleCategory=errorHandling(async(req,res,next)=>{
    let category=await categoryModel.findById(req.params.id)
    !category && res.status(404).json({message:"Category Not Found "})
     category && res.json({message:"success",category})
})

const updateCategory=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.img=req.file.fieldname
    let category=await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !category && res.status(404).json({message:"Category Not Found "})
     category  && res.json({message:"updated Successfully",category})
})
const deleteCategory=errorHandling(async(req,res,next)=>{
    let category=await categoryModel.findByIdAndDelete(req.params.id)
    !category && res.status(404).json({message:"Category Not Found "})
     category && res.json({message:"deleted Successfully",category})
})

export{
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}