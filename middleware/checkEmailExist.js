import { userModel } from "../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const checkEmailExist=async(req,res,next)=>{
    const user =await userModel.findOne({email:req.body.email})
    if(user) return next(new AppError("Email Already Exist",409))
        next()
}