import app from './app.js'
import dotenv from "dotenv"
import { dbconnect } from './config/db.js'
import cloudinary from 'cloudinary'

//handelling uncaught exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down server due to uncaught exception`)
        process.exit(1);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({
    path:"backend/config/config.env"
})
}



dbconnect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working at ${process.env.PORT}`);
})

//unhandled promise rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down server due to unhandeled promise rejection`)
    server.close(()=>{
        process.exit(1);
    })
})
