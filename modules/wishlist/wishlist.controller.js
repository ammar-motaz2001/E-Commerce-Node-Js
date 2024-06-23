import { errorHandling } from "../../middleware/catchError.js"
import { userModel } from "../../database/models/user.model.js"
const addToWishList=errorHandling(async(req,res,next)=>{
    let wishlist=await userModel.findOneAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true}).populate("wishlist")
    !wishlist && res.status(404).json({message:"wishlist Not Found "})
     wishlist  && res.json({message:"this product add To wishList ",wishlist:wishlist.wishlist})
})

const removeFromWishList=errorHandling(async(req,res,next)=>{
    let wishlist=await userModel.findOneAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true}).populate("wishlist")
    !wishlist && res.status(404).json({message:"wishlist Not Found "})
     wishlist  && res.json({message:"this product deleted From WishList ",wishlist:wishlist.wishlist})
})

const getLoggedUserWishList=errorHandling(async(req,res,next)=>{
    let wishlist=await userModel.findById(req.user._id).populate("wishlist")
    !wishlist && res.status(404).json({message:"wishlist Not Found "})
     wishlist  && res.json({message:"success",wishlist:wishlist.wishlist})
})
export{
    addToWishList,
    removeFromWishList,
    getLoggedUserWishList
}