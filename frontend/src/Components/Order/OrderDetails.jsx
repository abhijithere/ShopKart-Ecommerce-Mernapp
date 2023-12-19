import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

    const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto mt-20">

  <div class="flex justify-start item-start space-y-2 flex-col">
    <h1 class="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-700">Order # <span className="text-teal-500">{order && order._id}</span> </h1>
    <p class="text-base  font-medium leading-6 text-gray-600"><span className="text-teal-500">Paid At : </span>{order.paidAt}</p>
  </div>
  <div class="mt-10 flex  flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 ">
      <div class="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p class="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Your Order</p>
        {order.orderItems &&
                  order.orderItems.map((item) => (
             <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" key={item.product}>
             <div class="pb-4 md:pb-8 w-full md:w-40">
               <img class="w-full  md:block" src={item.image} alt="img"  className="h-48 rounded-xl"/>
             </div>
             <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
               <div class="w-full flex flex-col justify-start items-start space-y-8">
                 <h3 class="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800"> <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link></h3>
                 <div class="flex justify-start items-start flex-col space-y-2">
                   <p class="text-sm  leading-none text-teal-800"><span class=" text-teal-500">Style: </span>  Minimal Design</p>
                   <p class="text-sm  leading-none text-teal-800"><span class=" text-teal-500">Size: </span> All Size</p>
                   <p class="text-sm  leading-none text-teal-800"><span class=" text-teal-500">Color: </span> All Color</p>
                 </div>
               </div>
               <div class="flex justify-between space-x-8 items-start w-full">
                 <p class="text-base  xl:text-lg leading-6 text-green-400">₹{item.price} <span class="text-red-300 line-through">₹{item.price*2}</span></p>
                 <p class="text-base  xl:text-lg leading-6 text-green-400">{item.quantity}</p>
                 <p class="text-base  xl:text-lg font-semibold leading-6 text-gray-800">₹{item.price*`${item.quantity}`}</p>
               </div>
             </div>
           </div>
                  ))
        }
       
      </div>
      <div class="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
          <h3 class="text-xl  font-semibold leading-5 text-gray-800">Payment Info</h3>
          <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div class="flex justify-between w-full">
              <p class="text- leading-4 text-gray-800">Subtotal</p>
              <p class="text-base font-semibold  leading-4 text-gray-600">{order.totalPrice }</p>
            </div>
            <div class="flex justify-between items-center w-full">
              <p class="text- leading-4 text-gray-800">Discount <span class="bg-gray-200 p-1 text-xs font-medium  leading-3 text-gray-800">STUDENT</span></p>
              <p class="text-base  leading-4 text-gray-600">0</p>
            </div>
            
          </div>
          <div class="flex justify-between items-center w-full">
            <p class="text-base  font-semibold leading-4 text-gray-800">Total</p>
            <p class="text-base  font-semibold leading-4 text-gray-600"> <span>{order.totalPrice }</span>
</p>
          </div>
          <div className="flex justify-between">
            <h className='font-bold'>Payment Status :</h>
          <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID Successfully"
                      : "NOT PAID"}
                  </p>
          </div>
        </div>
        <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
          <h3 class="text-xl  font-semibold leading-5 text-gray-800">Order Status :</h3>
          <div class="flex justify-between items-start w-full">
            <div class="flex justify-center items-center space-x-4">
              <div class="w-8 h-8">
              </div>
              <div class="flex gap-5 justify-start items-center text-xl">
                Your Order In Status :
              <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                    
                  </p>
              </div>
            </div>
            <p class="text-lg font-semibold leading-6  text-gray-800"></p>
          </div>
          <div class="w-full flex justify-center items-center">
            <button class="hover:bg-black   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">Track Your Order</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 class="text-xl  font-semibold leading-5 text-gray-800">Customer</h3>
      <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div class="flex flex-col justify-start items-start flex-shrink-0">
          <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src={user.avatar.url} alt="avatar" className="h-20 rounded-xl"/>
            <div class="flex justify-start items-start flex-col space-y-2">
              <p class="text-base  font-semibold leading-4 text-left text-gray-800">{user.name}</p>
              <p class="text-sm  leading-5 text-gray-600">10+ Previous Orders</p>
            </div>
          </div>

          <div class="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="cursor-pointer text-sm leading-5 ">{user.email}</p>
          </div>
        </div>
        <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p class="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Info</p>
              <p class="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}, ${order.shippingInfo && order.shippingInfo.phoneNo}`}</p>
            </div>
            <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p class="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p class="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country},${order.shippingInfo && order.shippingInfo.phoneNo}`}</p>
            </div>
          </div>
          <div class="flex w-full justify-center items-center md:justify-start md:items-start">
            <button class="mt-6 md:mt-0     py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">Edit Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
