import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { AppError } from "../../utils/AppError.js"
import { couponModel } from "../../database/models/coupon.model.js"
const addcoupon=errorHandling(async(req,res,next)=>{
    let iscouponExist=await couponModel.findOne({code:req.body.code})
    if(iscouponExist) return next(new AppError("Coupon Added Before",401))
    let coupon=new couponModel(req.body)
    await coupon.save()
    res.json({message:"cupon added Successfully",coupon})
})

const getAllCoupons=errorHandling(async(req,res,next)=>{
    let apiFeatures=new ApiFeatures(couponModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allCoupons= await apiFeatures.mongooseQuery
     res.json({message:"success",allCoupons})
 })

const getSingleCoupon=errorHandling(async(req,res,next)=>{
    let coupon=await couponModel.findById(req.params.id)
    !coupon && res.status(404).json({message:"coupon Not Found "})
     coupon && res.json({message:"success",coupon})
})

const updateCoupon=errorHandling(async(req,res,next)=>{
    let coupon=await couponModel.findOneAndUpdate({_id:req.params.id},req.body,{new:true})
    !coupon && res.status(404).json({message:"coupon Not Found "})
     coupon  && res.json({message:"updated Successfully",coupon})
})
const deleteCoupon=errorHandling(async(req,res,next)=>{
    let coupon=await couponModel.findByIdAndDelete(req.params.id)
    !coupon && res.status(404).json({message:"coupon Not Found "})
     coupon && res.json({message:"deleted Successfully",coupon})
})

export{
    addcoupon,
    getAllCoupons,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon
}