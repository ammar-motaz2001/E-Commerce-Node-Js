import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { reviewModel } from "../../database/models/review.model.js"
import { AppError } from "../../utils/AppError.js"

const addreview=errorHandling(async(req,res,next)=>{
    req.body.user=req.user._id
    let isReviewExist=await reviewModel.findOne({user:req.user._id,product:req.body.product})
    if(isReviewExist) return next(new AppError("Review Added Before",401))
    let review=new reviewModel(req.body)
    await review.save()
    res.json({message:"review added Successfully",review})
})

const getAllreviews=errorHandling(async(req,res,next)=>{
    let apiFeatures=new ApiFeatures(reviewModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allReviews= await apiFeatures.mongooseQuery
     res.json({message:"success",allReviews})
 })

const getSinglereview=errorHandling(async(req,res,next)=>{
    let review=await reviewModel.findById(req.params.id)
    !review && res.status(404).json({message:"review Not Found "})
     review && res.json({message:"success",review})
})

const updateReview=errorHandling(async(req,res,next)=>{
    let review=await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
    !review && res.status(404).json({message:"review Not Found "})
     review  && res.json({message:"updated Successfully",review})
})
const deleteReview=errorHandling(async(req,res,next)=>{
    let review=await reviewModel.findOneAndDelete({_id:req.params.id,user:req.user._id})
    !review && res.status(404).json({message:"review Not Found "})
     review && res.json({message:"deleted Successfully",review})
})

export{
    addreview,
    getAllreviews,
    getSinglereview,
    updateReview,
    deleteReview
}