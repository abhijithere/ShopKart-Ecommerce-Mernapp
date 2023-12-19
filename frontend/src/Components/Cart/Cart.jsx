import React from 'react'
import CartItems from './CartItems'

// import "./Cart.css";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";

import { Link } from "react-router-dom";


function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
  
    const increaseQuantity = (id, quantity, stock) => {
      const newQty = quantity + 1;
      if (stock <= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
  
    const decreaseQuantity = (id, quantity) => {
      const newQty = quantity - 1;
      if (1 >= quantity) {
        return;
      }
      dispatch(addItemsToCart(id, newQty));
    };
  
    const deleteCartItems = (id) => {
      dispatch(removeItemsFromCart(id));
    };
  
    const checkoutHandler = () => {
      
      navigate("/login?redirect=shipping");
    };
  return (
   <>
     {cartItems.length === 0 ? (
      <div className="emptyCart h-96 flex flex-col justify-center items-center">

      <h1 className='text-4xl mt-44'>No Product in <span className=' text-green-500 font-bold'>Your Cart</span> </h1>
      <Link to="/products" className='h-14 rounded-lg w-44 bg-green-400 font-semibold text-xl flex justify-center items-center mt-6 text-white'>View Products</Link>
    </div>
  ) : (
    <>
  <div class=" bg-gray-100 pt-32 pb-10 -mb-44">
    <h1 class="mb-10 text-center text-4xl font-bold">Cart <span className='text-orange-500'> Items</span></h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
   
      <div class="rounded-lg md:w-2/3  flex flex-col" >
      {cartItems &&cartItems.map((item) => (

        <div className='' key={item.product}>
        <CartItems item={item} deleteCartItems={deleteCartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
        </div>
              )
              )
    }
        
      </div>
              
      {/* total bill  */}
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Quantity</p>
          <p class="text-gray-700">{cartItems.length}</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg text-orange-400 font-bold ml-5">  {`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
            <p class="text-sm text-green-400">including VAT</p>
          </div>
        </div>
        <button class="mt-6 w-full rounded-md bg-orange-500 py-1.5 font-medium text-blue-50 hover:bg-orange-600" onClick={() =>checkoutHandler()}>Check out</button>
      </div>
    </div>
  </div>
  </>
  )
}
</>
  )
}

export default Cart
