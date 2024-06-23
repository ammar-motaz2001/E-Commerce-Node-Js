import { errorHandling } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { userModel } from "../../database/models/user.model.js"

const adduser=errorHandling(async(req,res,next)=>{
    let user=new userModel(req.body)
    await user.save()
    res.json({message:"user added Successfully",user})
})

const getAllusers=errorHandling(async(req,res,next)=>{
    let apiFeatures=new ApiFeatures(userModel.find(),req.query)
   .pagination().filter().search().sort().fields()
    let allusers= await apiFeatures.mongooseQuery
     res.json({message:"success",allusers})
 })

const getSingleuser=errorHandling(async(req,res,next)=>{
    let user=await userModel.findById(req.params.id)
    !user && res.status(404).json({message:"user Not Found "})
     user && res.json({message:"success",user})
})

const updateuser=errorHandling(async(req,res,next)=>{
    let user=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    !user && res.status(404).json({message:"user Not Found "})
     user  && res.json({message:"updated Successfully",user})
})
const deleteuser=errorHandling(async(req,res,next)=>{
    let user=await userModel.findByIdAndDelete(req.params.id)
    !user && res.status(404).json({message:"user Not Found "})
     user && res.json({message:"deleted Successfully",user})
})

export{
    adduser,
    getAllusers,
    getSingleuser,
    updateuser,
    deleteuser
}