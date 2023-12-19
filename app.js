import express from "express"
import dotenv from "dotenv"
import router from './routes/productRoute.js'
import { errorMiddleware } from "./middleware/error.js";
import userroute from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from './routes/paymentRoute.js'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({
    path:"config/config.env"
})
}


const app =express();
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


app.use('/api/v1',router)
app.use('/api/v1',userroute)
app.use('/api/v1',orderRouter)
app.use('/api/v1',paymentRouter)



app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname,"./frontend/build/index.html"));
});

app.get("/",(req,res)=>{
    res.send("server is working properly")
})
//middle wire for error

// ../frontend/build/index.html




app.use(errorMiddleware)


export default app;

