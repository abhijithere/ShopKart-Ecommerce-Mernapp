import React from 'react'
import "./Slidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useSelector } from 'react-redux';

function Sidebar() {

  const { user} = useSelector((state) => state.user);
  return (
    <div className='h-screen bg-blue-50 border w-72 fixed left-0 z-10 top-0 bottom-0 shadow-2xl flex justify-start p-12  items-center  '>
       <div className="sidebar flex flex-col justify-start items-start gap-10 mt-4">
     
      <Link to="/profile" className='flc  flex-col gap-4 ml-6 mb-2'>
        <img src={user.avatar.url} alt="Ecommerce" className='h-24 rounded-full' /><h className='text-2xl text-slate-600  flc flex-col'>{user.name} <br/><span className='text-sm text-teal-600 '>Admin DashBoard</span> </h>
      </Link>
     
      <Link to="/admin/dashboard" className='  hover:scale-110  transition-all duration-300 '>
        <p className='flc gap-5 text-xl  text-slate-600'>
          <DashboardIcon className='text-teal-500 scale-[1.3]' /> Dashboard
        </p>
      </Link>
      <Link className='  hover:scale-110  transition-all duration-300   '>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon className='text-teal-500 scale-130'/>}
          defaultExpandIcon={<ImportExportIcon  className='text-teal-500 scale-[1.8]    '/>}
          className='flex  text-xl'
        >
          <TreeItem nodeId="1" label={<span className="text-xl ml-6 text-slate-600 ">Products</span>} className='text-2xl'>
            <Link to="/admin/products">
              <TreeItem nodeId="2" label={<span className="text-lg  text-slate-600 hover:bg-slate-200 p-2 pl-5 pr-5 rounded-lg ">All</span>} icon={<PostAddIcon  className='text-teal-500  ' />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label={<span className="text-lg  text-slate-600 hover:bg-slate-200 p-2  pl-5 pr-5 rounded-lg">Create</span>} icon={<AddIcon className='text-teal-500  ' />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders"className='  hover:scale-110  transition-all duration-300 ' >
        <p className='flc gap-6 text-xl  text-slate-600'>
          <ListAltIcon  className='text-teal-500 scale-[1.3]'/>
          Orders
        </p>
      </Link>
      <Link to="/admin/users" className='  hover:scale-110  transition-all duration-300 '>
        <p className='flc gap-6 text-xl  text-slate-600'>
          <PeopleIcon className='text-teal-500 scale-[1.3]'/> Users
        </p>
      </Link>
      <Link to="/admin/reviews" className='  hover:scale-110  transition-all duration-300'>
        <p className='flc   gap-6 text-xl  text-slate-600'>
          <RateReviewIcon className='text-teal-500 scale-[1.3]' />
          Reviews
        </p>
      </Link>
    </div>
    </div>
  )
}

export default Sidebar
