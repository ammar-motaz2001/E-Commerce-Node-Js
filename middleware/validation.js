
import { AppError } from "../utils/AppError.js"
export const validation=(schema)=>{

    return (req,res,next)=>{
        let filter={}
        if(req.file){
            filter={image:req.file,...req.body,...req.params,...req.query}
        }else if(req.files){
            filter={...req.files,...req.body,...req.params,...req.query}
        }
        
        else{
            filter={...req.body,...req.params,...req.query}
        }
        const {error}=schema.validate(filter)
        console.log(error)
        if(error){
            next(new AppError(error,401))
        }
        next()
    }
    
}