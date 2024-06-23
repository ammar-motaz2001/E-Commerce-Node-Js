import mongoose from "mongoose"


export const dbConnection=()=>{
    mongoose.connect("mongodb+srv://E-Commerce:pZCG1kP3u6P2X9yI@cluster0.nltsf0p.mongodb.net/ECommerce").then(()=>{
        console.log("Mongo is Connected...")
    }).catch((err)=>{
        console.log("Mongo is DisConnected !! ")
    })
}