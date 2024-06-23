
import mongoose from "mongoose";
import bcrypt from "bcrypt"


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,

    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    passwordChangedAt:Date,
    wishlist:[{type:mongoose.Types.ObjectId,ref:"product"}],
    addresses:[
        {
            street:String,
            phone:String,
            city:String
        }
    ]
},{timestamps:true})

userSchema.pre("save",function(){
    if(this.password) this.password=bcrypt.hashSync(this.password,8)
})
userSchema.pre("findOneAndUpdate",function(){
    if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,8)
})

export const userModel=mongoose.model("user",userSchema)