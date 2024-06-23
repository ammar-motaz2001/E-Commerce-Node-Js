import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { reviewModel } from "../../database/models/review.model.js"
import { AppError } from "../../utils/AppError.js"
import { cartModel } from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"
import { couponModel } from "../../database/models/coupon.model.js"

function calcTotalPrice(cart){
    let totalPrice=0
    
        cart.cartItems.forEach((item)=>{
            totalPrice+=item.quantity*item.price
        })
        cart.totalPrice=totalPrice
        if(cart.discount){
          let  totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice * cart.discount )/100
            cart.totalPriceAfterDiscount=totalPriceAfterDiscount
        }
}

const addToCart=errorHandling(async(req,res,next)=>{
    let product=await productModel.findById(req.body.product)
    if(!product) return next(new AppError("Product Not Found"),404)
    if(req.body.quantity>product.quantity) return next(new AppError("sold out"),401)
        req.body.price=product.price
    let isCartExist=await cartModel.findOne({user:req.user._id})
    if(!isCartExist){
        let cart =new cartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        !cart && res.status(404).json({message:"cart Not Found "})
        cart && res.json({message:"success",cart})
    }else{
        let item=isCartExist.cartItems.find((item)=>item.product==req.body.product)
        if(item){
            if(item.quantity>product.quantity) return next(new AppError("sold out"),401)
            item.quantity+=req.body.quantity||1
        } 
        else isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({message:"success",cart:isCartExist})
    }
})

const deleteFromCart=errorHandling(async(req,res,next)=>{
    let cart=await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
    await cart.save()
    !cart && res.status(404).json({message:"cart Not Found "})
    cart && res.json({message:"Deleted success",cart})
})
const updateQuantityInCart=errorHandling(async(req,res,next)=>{
    let cart=await cartModel.findOne({user:req.user._id})
    !cart && res.status(404).json({message:"cart Not Found "})
    let item= cart.cartItems.find(item=>item._id=req.params.id)
    if(!item) return next(new AppError("not fount item"),404)
    item.quantity=req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.json({message:"success",cart})
})
const getLoggedUserCart=errorHandling(async(req,res,next)=>{
    let cart=await cartModel.findOne({user:req.user._id}).populate("cartItems.product")
    !cart && res.status(404).json({message:"cart Not Found "})
    cart && res.json({message:"success",cart})

})

const clearCart=errorHandling(async(req,res,next)=>{
    let cart=await cartModel.findOneAndDelete({user:req.user._id},{new:true})
    !cart && res.status(404).json({message:"cart Not Found "})
        cart && res.json({message:"success"})
})

const applyCupon=errorHandling(async(req,res,next)=>{
    let cupon=await couponModel.findOne({code:req.body.cupon,expires:{$gte:Date.now()}})
    if(!cupon) next(new AppError("invalid Cupon"),404)
    let cart=await cartModel.findOne({user:req.user._id})
    if(!cart) next(new AppError("no cart "),404)
    let totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice * cupon.discount )/100
    cart.totalPriceAfterDiscount=totalPriceAfterDiscount
    cart.discount=cupon.discount
    await cart.save()
    res.json({message:"success",cart})

})


// const getAllreviews=errorHandling(async(req,res,next)=>{
//     let apiFeatures=new ApiFeatures(reviewModel.find(),req.query)
//    .pagination().filter().search().sort().fields()
//     let allReviews= await apiFeatures.mongooseQuery
//      res.json({message:"success",allReviews})
//  })

// const getSinglereview=errorHandling(async(req,res,next)=>{
//     let review=await reviewModel.findById(req.params.id)
//     !review && res.status(404).json({message:"review Not Found "})
//      review && res.json({message:"success",review})
// })

// const updateReview=errorHandling(async(req,res,next)=>{
//     let review=await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true})
//     !review && res.status(404).json({message:"review Not Found "})
//      review  && res.json({message:"updated Successfully",review})
// })
// const deleteReview=errorHandling(async(req,res,next)=>{
//     let review=await reviewModel.findOneAndDelete({_id:req.params.id,user:req.user._id})
//     !review && res.status(404).json({message:"review Not Found "})
//      review && res.json({message:"deleted Successfully",review})
// })

export{
    addToCart,
    deleteFromCart,
    updateQuantityInCart,
    getLoggedUserCart,
    clearCart,
    applyCupon
    
}