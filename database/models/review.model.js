import mongoose from "mongoose";



const reviewSchema=new mongoose.Schema({
    text:{
        type:String,
        min:[2,"Too Short review text"],
        trim:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"product"
    },

    rate:{
        type:Number,
        min:0,
        max:5
    },
},{timestamps:true})

export const reviewModel=mongoose.model("review",reviewSchema)