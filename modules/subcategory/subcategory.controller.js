import { errorHandling } from "../../middleware/catchError.js"
import { subcategoryModel } from "../../database/models/subcategory.model.js"
import slugify from "slugify"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addsubCategory=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory=new subcategoryModel(req.body)
    await subcategory.save()
    res.json({message:"subCategory added Successfully",subcategory})
})

const getAllsubCategories=errorHandling(async(req,res,next)=>{
    let filter={}
    if(req.params.category){
        filter.category=req.params.category
    }
    let apiFeatures=new ApiFeatures(subcategoryModel.find(filter),req.query)
    .pagination().filter().search().sort().fields()
     let allsubCategories= await apiFeatures.mongooseQuery
     res.json({message:"success",allsubCategories})
 })

const getSinglesubCategory=errorHandling(async(req,res,next)=>{
    let subcategory=await subcategoryModel.findById(req.params.id)
    !subcategory && res.status(404).json({message:"subCategory Not Found "})
     subcategory && res.json({message:"success",subcategory})
})

const updatesubCategories=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    let subcategory=await subcategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !subcategory && res.status(404).json({message:"subCategory Not Found "})
     subcategory  && res.json({message:"updated Successfully",subcategory})
})
const deletesubCategory=errorHandling(async(req,res,next)=>{
    let subcategory=await subcategoryModel.findByIdAndDelete(req.params.id)
    !subcategory && res.status(404).json({message:"subCategory Not Found "})
     subcategory && res.json({message:"deleted Successfully",subcategory})
})

export{
    addsubCategory,
    getAllsubCategories,
    getSinglesubCategory,
    updatesubCategories,
    deletesubCategory
}