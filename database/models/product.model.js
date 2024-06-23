import mongoose from "mongoose";



const productSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:[true,"title is required"],
        minLength:[2,"Too Short product title"],
        trim:true,
        required:true
    },

    slug:{
        type:String,
        lowercase:true,
        required:true
    },
   description:{
    type:String,
    minLength:[2,"Too Short product description"],
    maxLength:[200,"Too Long product description"],
    trim:true,
    required:true
   },
   imgCover:String,
   images:[],
   price:{
    type:Number,
    min:0,
    required:true
   },
   priceAfterDiscount:{
    type:Number,
    min:0,
    required:true
   },
   quantity:{
    type:Number,
    min:0,
    required:true
   },
   sold:Number,
   rateAvg:{
    type:Number,
    min:0,
    max:5,
   },
   rateCount:{
    type:Number,
    min:0,
    max:5,
   },
   category:{
    type:mongoose.Types.ObjectId,
    ref:"category"
},
subCategory:{
    type:mongoose.Types.ObjectId,
    ref:"subcategory"
},

brand:{
    type:mongoose.Types.ObjectId,
    ref:"brand"
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'user'
}
},{timestamps:true,toJSON: { virtuals: true }})

productSchema.pre('init',function(doc){
    if(doc.imgCover) doc.imgCover='http://localhost:4000/'+'uploads/'+doc.imgCover
    if(doc.images)   doc.images=doc.images.map((val)=>doc.imgCover='http://localhost:4000/'+'uploads/'+val)
})
productSchema.virtual('Reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
    justOne: true
  });

  productSchema.pre("findOne",function(){
    this.populate("Reviews")
  })

export const productModel=mongoose.model("product",productSchema)