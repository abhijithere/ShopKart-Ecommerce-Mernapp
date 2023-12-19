import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import './Dashboard.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend  } from 'chart.js';
import { Doughnut} from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
function DashBoard() {
  ChartJS.register(ArcElement,Tooltip, Legend);
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock == 0) {
        outOfStock += 1;
      }
    });


  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    
  const doughnutState = {
    labels: ["Out of Stock", "Product InStock"],
    datasets: [
      {
        backgroundColor: ["#14b8a6", "#896ddc"],
        hoverBackgroundColor: ["#0d7669", "#7058b7"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='bg-slate-100  absolute right-0 pb-10  -bottom- top-0 z-5 w-[calc(100%-288px)] flex flex-col justify-start items-center'>
            <h1 className='text-4xl font-semibold mt-32 text-slate-600 mb-16'>Admin <span className='text-teal-500'>Dashboard</span></h1>

            <div className='grid grid-cols-4 gap-8  select-none'>
              <div className='h-44 w-64 rounded-lg shadow-sm bg-purple-300 flc flex-col gap-5  cursor-pointer'>
                <h className='text-xl text-slate-500'>Total Amount</h>
                <p className='text-3xl text-white font-bold'>₹{totalAmount}</p>
              </div>
              <div className='h-44 w-64 rounded-lg shadow-sm bg-blue-200 flc flex-col gap-5 cursor-pointer'>
              <h className='text-xl text-slate-500'>Product</h>
                <p className='text-3xl text-white font-bold'>{products && products.length}</p>
              </div>
              <div className='h-44 w-64 rounded-lg shadow-sm bg-green-200 flc flex-col gap-5 cursor-pointer'>
              <h className='text-xl text-slate-500'>Orders</h>
                <p className='text-3xl text-white font-bold'>{orders && orders.length}</p>
              </div>
              <div className='h-44 w-64 rounded-lg shadow-sm bg-teal-200 flc flex-col gap-5 cursor-pointer'>
              <h className='text-xl text-slate-500'>Users</h>
                <p className='text-3xl text-white font-bold'>{users && users.length}</p>
              </div>

            </div>

          {/* charts  */}
          <div className="doughnutChart mt-20">
          <Doughnut data={doughnutState} />
        </div>



      </div>
    </div>
  )
}

export default DashBoard
