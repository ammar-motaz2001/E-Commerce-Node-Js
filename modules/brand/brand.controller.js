import slugify from "slugify"
import { errorHandling } from "../../middleware/catchError.js"
import { brandModel } from "../../database/models/brand.model.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"

const addBrand=errorHandling(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file.filename
    let brand=new brandModel(req.body)
    await brand.save()
    res.json({message:"brand added Successfully",brand})
})

const getAllBrands=errorHandling(async(req,res,next)=>{
    let apiFeatures=new ApiFeatures(brandModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allBrands= await apiFeatures.mongooseQuery
     res.json({message:"success",allBrands})
 })

const getSingleBrand=errorHandling(async(req,res,next)=>{
    let brand=await brandModel.findById(req.params.id)
    !brand && res.status(404).json({message:"brand Not Found "})
     brand && res.json({message:"success",brand})
})

const updateBrand=errorHandling(async(req,res,next)=>{
    console.log(req.body.name)
    req.body.slug=slugify(req.body.name)
    req.body.logo=req.file?.fieldname
    let brand=await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !brand && res.status(404).json({message:"brand Not Found "})
     brand  && res.json({message:"updated Successfully",brand})
})
const deleteBrand=errorHandling(async(req,res,next)=>{
    let brand=await brandModel.findByIdAndDelete(req.params.id)
    !brand && res.status(404).json({message:"brand Not Found "})
     brand && res.json({message:"deleted Successfully",brand})
})

export{
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}