import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "please enter product description"],
    },
    price: {
        type: Number,
        required: [true, "please enter product price"],
        maxLength: [8, "price can't exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "please enter product Category "],
    },
    Stock: {
        type: String,
        required: [true, "please enter product stock"],
        maxLength: [4, "stock can't exceed 4 characters"],
        default:1,
    },
    numberofReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },        
            name:{
                type:String,
                required:true,
            },
            reting:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],

    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
    }

})

export const Product= mongoose.model("Product",productSchema);