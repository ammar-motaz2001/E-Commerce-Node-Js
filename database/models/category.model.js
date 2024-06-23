import mongoose from "mongoose";



const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name is required"],
        min:[2,"Too Short Category Name"],
        trim:true,
        required:true
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    img:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})

categorySchema.post('init',function(doc){
    if(doc.img) doc.img='http://localhost:4000/'+'uploads/'+doc.img
})

export const categoryModel=mongoose.model("category",categorySchema)