
import mongoose from 'mongoose'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

export const uploadFile=()=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,new mongoose.Types.ObjectId+file.originalname)
    }
  })
  
  const upload = multer({ storage,fileFilter })
function fileFilter (req, file, cb) {
    if(file.mimetype.startsWith("image")){
         cb(null, true)
    }else{
       cb(new AppErr("Images only",401),false)
    }
}
    return upload
}
export const uploadSingleFile=(fieldName)=>uploadFile().single(fieldName)
export const uploadArrayOfFiles=(fieldName)=>uploadFile().array(fieldName)
export const uploadfields=(fieldName)=>uploadFile().fields(fieldName)

