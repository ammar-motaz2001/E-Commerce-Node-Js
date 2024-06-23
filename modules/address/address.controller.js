import { errorHandling } from "../../middleware/catchError.js"
import { userModel } from "../../database/models/user.model.js"
const addAddress=errorHandling(async(req,res,next)=>{
    let address=await userModel.findOneAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    !address && res.status(404).json({message:"address Not Found "})
     address && res.json({message:"success ",address:address.addresses})
})

const removeAddress=errorHandling(async(req,res,next)=>{
    let address=await userModel.findOneAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    !address && res.status(404).json({message:"address Not Found "})
     address  && res.json({message:" Address Deleted",address:address.addresses})
})
const updateAddress=errorHandling(async(req,res,next)=>{
    let address=await userModel.findOneAndUpdate(req.user._id,{addresses:req.body},{new:true})
    !address && res.status(404).json({message:"address Not Found "})
     address  && res.json({message:" Address updated",address:address.addresses})
})
const getLoggedUserAddresses=errorHandling(async(req,res,next)=>{
    let address=await userModel.findById(req.user._id)
    !address && res.status(404).json({message:"address Not Found "})
     address  && res.json({message:" Address updated",address:address.addresses})
})
export{
    addAddress,
    removeAddress,
    updateAddress,
    getLoggedUserAddresses
}