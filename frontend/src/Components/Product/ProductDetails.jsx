import React, { useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
import {useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails ,newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
// import ReactStars from "react-rating-stars-component"
import { Rating } from "@material-ui/lab";
import ReviewCard from './ReviewCard';
import Loader from "../Layout/Loader"
import './style.css'
import { useAlert } from 'react-alert';
import { addItemsToCart  } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@material-ui/core";
import { NEW_REVIEW_RESET } from '../../constants/productsConstants';



const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


    
    const { product, loading, error  } = useSelector(
        (state) => state.productDetails,
    );
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
    
    
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };


    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
          }
      
          if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
          }

        dispatch(getProductDetails(id))


    }, [dispatch, id,error,alert,quantity,success,reviewError,params.id]);

    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
    
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreaseQuantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };
    

    // const options = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     value: product.ratings,
    //     isHalf: true,
    //     size: window.innerWidth < 600 ? 20 : 25
    //   }

      const options = {
        size: "medium",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };

      const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added To Cart");
      };
   
 
    return (

        <>
        {loading? <Loader/>:
        <>
           <div className='Product-details flex  justify-center items-center h-screen gap-20 bg-gray-100 rounded-xl  border border-gray-200 shadow-sm mt-10'>
                <div className='w-[25%] max-h-[70%] rounded-xl overflow-hidden'>
                    <Carousel 
                      autoPlay={false}
                      indicators={false}
                      navButtonsAlwaysVisible={false}
                      className=''
                      >
                        {
                            product.images && product.images.map((item, i) => (
                                <img key={item.url} src={item.url} alt={`${i} slide`} className='h-fit w-fit rounded-xl '/>
                            ))
                        }
                    </Carousel>

                </div>
                <div className='right w-[40%]  font-poppin '>
                
					<h4
						class="font-bold text-orange mb-2 uppercase text-xs tracking-widest text-teal-600"
					>
						Ecart Company 
					</h4>
					<h1
						class="text-very-dark mb-4 font-bold text-3xl lg:text-4xl"
					>
						{product.name}
					</h1>
					<p class="text-gray-600 mb-6 text-base sm:text-lg">
						{product.description}
					</p>

					<div
						class="flex items-center justify-between mb-6 sm:flex-col sm:items-start"
					>
						<div class="flex items-center gap-4">
							<h3
								class="text-orange-600 font-bold text-3xl inline-block"
							>
								{`₹${product.price}`}
							</h3>
							<span
								class="inline-block h-fit py-0.5 px-2 font-bold bg-pale-orange text-orange-500 bg-orange-100 rounded-lg text-sm "
								>50%</span>
						</div>
						<p
							class="text-dark-grayish w-fit line-through decoration-dark-grayish decoration-1 my-auto"
						>
							{`₹${product.price*2}`}
						</p>
					</div>
                    
                    <div className='flex  justify-start gap-6 items-center -mt-3'>
                    <Rating {...options }  /><span className='text-green-600 '>({product.numberofReviews} Reviews)</span></div>
                    <div className='mt-2'>Status : <span className={`${product.Stock<1?"bg-red-200 text-red-600":"bg-green-100  text-green-500" } rounded-md pl-4 pr-4 `}>{product.Stock<1?"OutofStock":"inStock"}</span></div>

                        <div className='mt-5 flex justify-start items-center gap-10'>
                            <div className='flex justify-around items-center bg-green-200 w-44 p-2  rounded-lg text-xl text-green-700 shadow-lg'>
                                <button className='  font-bold' onClick={increaseQuantity}>+</button>
                                <p>{quantity}</p>
                                <button className='font-bold' onClick={decreaseQuantity}>-</button>
                            </div>
                            <button  className=' bg-orange-500 p-3 w-64 rounded-lg text-white  font-semibold' disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                        </div>
					
                        <button  className='mt-6 bg-green-400 p-3 w-44 rounded-lg text-white  font-semibold' onClick={submitReviewToggle}>Submit Review</button>
                </div>

            </div>
            <div  className='text-center mt-10 flex- justify-center items-center  font-semibold text-3xl  '><h className='w-52 h-20 p-4 border-b-4 border-gray-200  text-orange-600 text-center'>Reviews</h></div>

            <div className="review flex  justify-center items-center -mb-32 ">

                {
                    product.reviews && product.reviews[0]?(
                        <div className='mycard flex  overflow-x-auto gap-5 pl-8 pr-8'>
                            {
                                product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>
                                )
                            }
                        </div>
                    ):(
                    <div className='mt-24 text-3xl text-slate-400'>No review yet</div>
                    )
                }
            </div>
            {/* for dialog box review  */}
            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
            className=''
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog flex flex-col gap-4">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea w-96 outline-none border-[2px] rounded-lg p-4 caret-teal-500"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

            {/* review ends */}
           
        </>
}

        </>
    )
}

export default ProductDetails
