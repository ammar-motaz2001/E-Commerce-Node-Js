import mongoose from "mongoose";



const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name is required"],
        min:[2,"Too Short brand Name"],
        trim:true,
        required:true
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true})
        brandSchema.post('init',function(doc){
            if(doc.logo) doc.logo='http://localhost:4000/'+'uploads/'+doc.logo
        })
export const brandModel=mongoose.model("brand",brandSchema)



