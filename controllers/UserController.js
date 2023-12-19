import ErrorHandler from "../middleware/error.js";
import { asyncerror } from "../middleware/catchAsyncError.js";
import { User } from "../models/usermodels.js";
import { sendToken } from "../utils/jwttoken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto'
import cloudinary from 'cloudinary'



// register a user  : ---------------------------------

export const registerUser = asyncerror(async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        // width: 150,
        // crop: "scale",
      });

    const {name,email,password}=req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
        public_id:myCloud.public_id,
        url:myCloud.secure_url,
        }
    });

    
    sendToken(user,201,res);

    })


// login a user : ------------------------------

export const loginUser = asyncerror(async(req,res,next)=>{
    
    const {email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHandler("please enter email & password",400))
    }

    const user = await User.findOne({ email }).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched =await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }


    sendToken(user,200,res);

})

//logout user : -----------------------------------------

export const LogoutUser = asyncerror(async(req,res,next)=>{

    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message: " Logged out ",
    })
})

// forgot password : -------------------------------------

export const forgotPassword = asyncerror(async(req,res,next)=>{

    const user = await User.findOne({ email: req.body.email })

    if(!user){
        return next(new ErrorHandler("User not found",404));

    }

    // get reset password 
    const resettoken =  user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})
    //${req.protocol}://${req.get("host")}/

    const resetpasswordurl = `${req.protocol}://${req.get("host")}/password/reset/${resettoken}`
    const message = `your password reset token is :- \n\n ${resetpasswordurl} \n\n ignore if not requested`

    try {

        await sendEmail({
            email:user.email,
            subject:"Password recovery",
            message,
        })
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire= undefined;
        await user.save({validateBeforeSave:false})


        return next(new ErrorHandler(error.message,500));
    }
})



// RESET PASSWORD : ---------------------------------------


export const resetPassword = asyncerror(async (req,res,next)=>{
    
    //creating token hash 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt : Date.now() },
    })


    if(!user){
        return next(new ErrorHandler("Reset Password token is invalid or expired",400));

    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does't match",404));
    }

    user.password= req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire= undefined;

    await user.save();

    sendToken(user,200,res)

})



// get User details : ------------------------------------


export const getUserDetails = asyncerror(async(req,res,next)=>{

    const user = await User.findById(req.user.id);


    res.status(200).json({
        success:true,
        user,
    })

})


// update user password : --------------------------------

export const updatePassword = asyncerror(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect",400));

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does't match",400));

    }

    user.password= req.body.confirmPassword;
    await user.save()


    sendToken(user,200,res);

})



// update user profile : --------------------------------

export const updateProfile = asyncerror(async(req,res,next)=>{

    
    
    const newUserdata ={

        name:req.body.name,
        email:req.body.email,
        
    }

    //

    if(req.body.avatar!==""){
        const user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            // crop: "scale",
          });

          newUserdata.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
          }

    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"profile updated successfully"

    })
})



// get all users (admin): --------------------------------


export const getAllUser = asyncerror(async(req,res,next)=>{


    const user = await User.find();
    res.status(200).json({
        success:true,
        user,
    })

})

// get single users (admin): --------------------------------


export const getSingleUser = asyncerror(async(req,res,next)=>{


    const user = await User.findById(req.params.id);

if(!user){
    return next(new ErrorHandler("User does't exist",400));

}

    res.status(200).json({
        success:true,
        user,
    })

})


// update user role (admin) : --------------------------------

export const updateUserRole = asyncerror(async(req,res,next)=>{

    
    const newUserdata ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }


    //

    const user = await User.findByIdAndUpdate(req.params.id,newUserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"profile updated successfully (admin)"

    })
})
// Delete user (admin) : --------------------------------

export const deleteUserProfile = asyncerror(async(req,res,next)=>{

    
    const user = await User.findById(req.params.id)
  
    if(!user){
        return next(new ErrorHandler("User does't exist",400));
    
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"profile deleted successfully"

    })
})


