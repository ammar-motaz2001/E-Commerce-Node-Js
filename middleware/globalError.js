
export const globalError=(err,req,res,next)=>{
    err.statusCode=err.statusCode|| 500
    res.status(err.statusCode).json({message:"error",error:err.message})
}