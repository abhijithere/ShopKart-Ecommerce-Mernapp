import React from 'react'
import { Link } from 'react-router-dom';


function CartItems({item,deleteCartItems,increaseQuantity,decreaseQuantity}) {
  return (
    <>
      <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={item.image} alt="product-image" class="w-full rounded-lg sm:w-40 " />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
             <Link to={`/product/${item.product}`}><h2 class="text-lg font-bold text-gray-900">{item.name}</h2></Link>
             
              <p class="mt-1 text-2xl text-green-400 ">₹{item.price}</p>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-400 hover:text-blue-50 " onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }> - </span>
                <div class="h-8 w-8 border  flex justify-center items-center text-green-500 "  >{item.quantity}</div>
                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-400 hover:text-blue-50" onClick={() => increaseQuantity( item.product,
                          item.quantity,
                          item.stock)} > + </span>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-lg text-orange-500">₹{item.price*`${item.quantity}`}</p>
                <svg  xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => deleteCartItems(item.product)}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default CartItems
