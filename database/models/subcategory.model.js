import mongoose from "mongoose";
const subcategorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name is required"],
        min:[2,"Too Short subCategory Name"],
        trim:true,
        required:true
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})
subcategorySchema.pre('find',function(){
    this.populate('category')
})
export const subcategoryModel=mongoose.model("subcategory",subcategorySchema)