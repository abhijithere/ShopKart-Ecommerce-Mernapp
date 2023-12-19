import ErrorHandler from "../middleware/error.js";
import { Product } from "../models/product.js"
import { asyncerror } from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";
import cloudinary from 'cloudinary'

//create product-----Admin
export const createProduct = asyncerror(async (req, res, next) => {
   
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
   
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
}
);



//get all products
export const getAllProducts = asyncerror(async (req, res,next) => {
    

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

   const  products = await apifeatures.query;
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
    })
});

//update product -- Admin

export const UpdateProduct = asyncerror(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }


  if (images !== undefined) {
    if (product.images && Array.isArray(product.images)) {

    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
    }
}

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        product
    })
});


//delete products 

export const deleteProduct = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "product Deleted successfully"
    })

});

//get product details 

export const getProsductDetails = asyncerror(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }


    return res.status(200).json({
        success: true,
        product,
    })

});


// create new review or update review

export const createProductReview = asyncerror(async(req,res,next)=>{

    const {rating,comment,productId} = req.body;

    const review ={
        user:req.user._id,
        name:req.user.name,
        reting:Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())

    if(isReviewed){

        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
                rev.reting=rating,
                rev.comment=comment
        })

    }else{
        product.reviews.push(review)
        product.numberofReviews=product.reviews.length
    }

    let avg=0;
     product.reviews.forEach((rev)=>{
        avg += rev.reting;
    })
    
    product.ratings= avg/product.reviews.length;


    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        message:"review added successfully"
    })

})

// get all reviews
export const getProsductReviews=asyncerror(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("product not found",404))
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
})

// delete review

export const deleteReview = asyncerror(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("product not found",404))
    }

    const reviews=product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());


    let avg=0;
    reviews.forEach((rev)=>{
       avg += rev.reting;
   })

   let ratings=0;

if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
   
   const numberofReviews = reviews.length;

   await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numberofReviews,
},{
    new: true,
    runValidators: true,
    useFindAndModify: false,
   })

    res.status(200).json({
        success:true,
    })
})

// Get All Product (Admin)
export const getAdminProducts = asyncerror(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });