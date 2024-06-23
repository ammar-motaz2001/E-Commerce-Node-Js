
import mongoose from "mongoose";



const orderSchema=new mongoose.Schema({
   user:{type:mongoose.Types.ObjectId,ref:"user"},
   orderItems:[
    {
        product:{
            type:mongoose.Types.ObjectId,
            ref:'product'
        },
        quantity:Number,
        price:Number
    }
   ],
   shippingAddress:
    {
        street:String,
        phone:String,
        ciry:String
    },
   paymentMethod:{
    type:String,
    enum:['cash','credit'],
    default:'cash'
   },

   isDelivered:{
    type:Boolean,
    default:false
   },
   isPaid:{
    type:Boolean,
    default:false
   },
   paidAt:Date,
   totalOrderPrice:Number,
},{timestamps:true})

export const orderModel=mongoose.model("order",orderSchema)