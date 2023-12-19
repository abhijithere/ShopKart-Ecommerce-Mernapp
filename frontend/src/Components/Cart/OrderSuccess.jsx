import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="orderSuccess mt-44 flex flex-col gap-6 justify-center items-center -mb-20">
<img src='/img/mark.png' className="h-28" />
    <div className="text-4xl font-semibold text-slate-600">We Have Received <span className="text-teal-500">Your Order !</span></div>
    <Link to="/orders" className="h-14 w-52 text-lg text-white mt-10 rounded-lg bg-teal-500  font-semibold flex justify-center items-center">View Orders</Link>
  </div>
  )
}

export default OrderSuccess
