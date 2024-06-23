
import mongoose from "mongoose";



const couponSchema=new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true
    },

    discount:{
        type:Number,
        required:true
    },
    expires:Date,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

export const couponModel=mongoose.model("coupon",couponSchema)