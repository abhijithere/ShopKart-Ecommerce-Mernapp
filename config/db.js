import mongoose from "mongoose";

export const dbconnect= ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"ecommerce",
    },{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
    }).then(()=>{
        console.log("database connected")
    })
}





