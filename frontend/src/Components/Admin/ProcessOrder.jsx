import React, { Fragment, useEffect, useState } from "react";
// import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


const ProcessOrder = () => {
    const params = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(params.id));
  }, [dispatch, alert, error, params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer bg-slate-100  absolute right-0  min-h-[120vh] pb-32   top-0 z-5 w-[calc(100%-288px)] flex flex-col justify-center items-center ">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage mt-20"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
    {/* thisone  */}
              <div class="mt-10 flex  flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8 ">
      <div class="flex flex-col justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p class="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Order Details</p>
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
              <p class="text-base font-semibold  leading-4 text-gray-600">{order.totalPrice}</p>
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
            <div className="flex justify-center items-center gap-4 text-xl">
          <h3 class="text-xl  font-semibold leading-5 text-gray-800">Order Status :</h3>
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
          <div class="flex justify-between items-start w-full">
            <div class="flex justify-center items-center space-x-4">
              <div class="w-8 h-8">
              </div>
              <div class="flex gap-5 justify-start items-center text-xl">
              
             
              </div>
            </div>
            <p class="text-lg font-semibold leading-6  text-gray-800"></p>
          </div>
          <div class="w-full flex justify-center items-center">
            <button class="hover:bg-teal-600   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-800 py-5 w-96 md:w-full bg-teal-500 text-base font-medium leading-4 text-white"> Order Status</button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 class="text-xl  font-semibold leading-5 text-gray-800">Customer</h3>
      <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div class="flex flex-col justify-start items-start flex-shrink-0">
          <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <div class="flex justify-start items-start flex-col space-y-2">
              <p class="text-base  font-semibold leading-4 text-left text-gray-800">{order.user && order.user.name}</p>
              <p class="text-sm  leading-5 text-gray-600">10+ Previous Orders</p>
            </div>
          </div>

          <div class="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
           
            <p class="cursor-pointer text-sm leading-5 ">ph no :  {order.shippingInfo && order.shippingInfo.phoneNo}</p>
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
          
        </div>
      </div>
    </div>
  </div>



              {/* this one  */}

              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
                className="w-[100%] bg-white mt-10 p-16  shadow-lg flex justify-center items-center"
              >
                <form
                  className="updateOrderForm flex  flex-col justify-center gap-5 items-start"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1 className="text-2xl text-slate-600">Process Order</h1>

                  <div className="w-[60%] border-[1.6px] pl-6  flex gap-5 justify-start items-center rounded-lg hover:border-teal-200">
                    <AccountTreeIcon  className="text-slate-500 hover:text-teal-200"/>
                    <select onChange={(e) => setStatus(e.target.value)}
                    className="w-96 p-5 outline-none caret-teal-500 text-xl text-slate-500 "

                    >
                      <option value="">Choose Category</option>
                      {order.orderStatus == "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>
                  <button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                    className="w-44 h-14 bg-teal-300 rounded-lg hover:bg-teal-500 text-lg text-white font-bold"
                  >
                    Process
                  </button>
                </form>
              </div>

              {/* this end  */}
             
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
