import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name can't exceed 30 character"],
        minLength: [4, "name should have more than 4 character"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "password should be grater than 8 character"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

//password hashing 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})


// jwt token 

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

// compare password 

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


// generating reset password

userSchema.methods.getResetPasswordToken = function(){

    //generate token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hashing and adding reset password
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() +15 * 60 * 1000;

    return resetToken;
}




export const User = mongoose.model("User",userSchema);