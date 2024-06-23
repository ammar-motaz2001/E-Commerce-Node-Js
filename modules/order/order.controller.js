import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { reviewModel } from "../../database/models/review.model.js"
import { AppError } from "../../utils/AppError.js"
import { cartModel } from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"
import { couponModel } from "../../database/models/coupon.model.js"
import { orderModel } from "../../database/models/order.model.js"

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PUpVz03Ik10aAMUgpoUIviwI9MhEWA7LJXhW6oiKPfv39DM2LWOfC0I9zDvUK62PgMlySESofVkdV8jvZw1LRGY00HIQMBs1m');
const addCashOrder=errorHandling(async(req,res,next)=>{
   let cart=await cartModel.findById(req.params.id)
   if(!cart) next(new AppError("No Cart"),401)

    let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    let order= new orderModel({
        user:req.user._id,
        orderItems:cart.cartItems,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
    })

    await order.save()

    let options=cart.cartItems.map((prod)=>{
        return (

            {
                updateOne:{
                    "filter":{_id:prod.product},
                    "update":{$inc:{sold:prod.quantity,quantity:-prod.quantity}}
                }
            }
        )
    })

    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:"success",order})
})

const getSpecificOrder=errorHandling(async(req,res,next)=>{
    let order=await orderModel.findOne({user:req.user._id}).populate("orderItems.product")
    res.json({message:"success",order})
 })

 const getAllOrder=errorHandling(async(req,res,next)=>{
    let order=await orderModel.find({}).populate("orderItems.product")
    res.json({message:"success",order})
 })
 const createCheckOutSession=errorHandling(async(req,res,next)=>{
    let cart=await cartModel.findById(req.params.id)
    let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice

   let session=await stripe.checkout.sessions.create({
    line_items:[
        {
            price_data:{
                currency:"egp",
                unit_amount:totalOrderPrice*100,
                product_data:{
                    name:req.user.name
                }
            },
            quantity:1
        }
    ],
    mode:"payment",
    success_url:"https://e-commerce-seven-peach.vercel.app/#",
    cancel_url:"https://e-commerce-seven-peach.vercel.app/#/cart",
    customer_email:req.user.email,
    client_reference_id:req.params.id,
    metadata:req.body.shippingAddress


   })
   res.json({message:"success",session})
 })
export{
    
    addCashOrder,
    getSpecificOrder,
    getAllOrder,
    createCheckOutSession
}