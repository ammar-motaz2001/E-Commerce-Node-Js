import { userModel } from "../../database/models/user.model.js"
import { errorHandling } from "../../middleware/catchError.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError } from "../../utils/AppError.js"
const signup=errorHandling(async(req,res)=>{
    let user=new userModel(req.body)
    await user.save()
    res.json({message:"user Signed Up !"})
})

const signin=errorHandling(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user && bcrypt.compareSync(req.body.password,user.password) ){
        let token=jwt.sign({userId:user._id,email:user.email},"ammar motaz")
        res.json({message:"user signed In",token})
    }
    res.json({message:"incorrect Email or password"})
})
const changePassword=errorHandling(async(req,res,next)=>{
    let user = await userModel.findById(req.params.id)
    if(user && bcrypt.compareSync(req.body.password,user.password)){
        let token=jwt.sign({userId:user._id,role:user.role},"ammar motaz")
        await userModel.findByIdAndUpdate(req.params.id,{password:req.body.newPassword,passwordChangedAt:Date.now()})
        return res.json({message:"password Changed Successfully",token})
        
    }else{
        next(new AppError("inconrrect",401))
    }
       
})

const protectedRoutes=errorHandling(async(req,res,next)=>{
  
    let {token}=req.headers
    if(!token) return next(new AppError("token should  provided",401))
    let decoded=jwt.verify(token,"ammar motaz")
    console.log(decoded)
    let user=await userModel.findById(decoded.userId)
    if(!user) return next(new AppError("user not found",401))

        if(user.passwordChangedAt){
            let timeChangPassword=parseInt(user.passwordChangedAt.getTime()/1000)
            let decodeTime=decoded.iat
            if(timeChangPassword>decodeTime) return next(new AppError("token is invalid",401))
        }
        req.user=user
        next()

})

const allowUsers=(...roles)=>{


    return async(req,res,next)=>{
  
       if(!roles.includes(req.user.role)) return next(new AppError("you are not authorized",401))
        next()
    
    }
}


export{
    signup,
    signin,
    changePassword,
    protectedRoutes,
    allowUsers
}