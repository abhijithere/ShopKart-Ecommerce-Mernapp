import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from '../../actions/userAction';
import { useDispatch } from 'react-redux';





function Navbar({isAuthenticated,user}) {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();


  const [close,setclose]=useState(true);
  const [dropopen, setdropopen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: 0 > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if(isAuthenticated){
    if (user.role === "admin") {
      options.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }
  }
 const dropopenclose=()=>{
    dropopen?setdropopen(false):setdropopen(true);
 }
  function dashboard() {
    navigate(`/admin/dashboard`);
  }

  function orders() {
    navigate(`/orders`);
  }
  function account() {
    navigate(`/profile`);
  }
  function cart() {
    navigate(`/cart`);

  }
  function logoutUser() {
    dispatch(logout());
    navigate(`/login`);
    alert.success("Logout Successfully");
  }
  return(
    <>


<div class="navbar111 flex flex-wrap place-items-center w-screen fixed z-40 top-0">
  <section class="relative mx-auto">
    <nav class="flex justify-between bg-gray-900 text-white w-screen">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        <a class="text-3xl font-bold font-heading" href="#">
          
          Logo Here.
        </a>
       
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <Link to={"/"}><a class="hover:text-gray-200" >Home</a></Link>
          <Link to={"/products"}><a class="hover:text-gray-200" >Products</a></Link>
          <li><a class="hover:text-gray-200" href="#">Collections</a></li>
          <li><a class="hover:text-gray-200" href="#">Contact Us</a></li>
        </ul>
        <div class="hidden xl:flex items-center space-x-5 ">
          <a class="hover:text-gray-200" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
            <Link to={"/cart"}>
          <a class="flex items-center hover:text-gray-200 cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
          </a>
              </Link>
         <div className='flex  items-center'>
            {
              isAuthenticated?(<Link onClick={dropopenclose}><img src={user.avatar.url} className='h-7 w-7 cursor-pointer rounded-full'/></Link>): 
              <Link to={"/login"} class="flex items-center hover:text-gray-200" ><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </Link>
            }
            
            </div>
             
          
          
        </div>
      </div>
      <a class="xl:hidden flex mr-6 items-center" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="flex absolute -mt-5 ml-4">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
      </a>
      <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </a>
    </nav>
    
  </section>
  
</div>
    {
      isAuthenticated?<div className={`fixed  top-20 right-10 rounded-xl shadow-xl border  border-b-4 border-b-yellow-300  z-20 h-[500px] w-80 bg-white p-5 transition-opacity duration-500 flex flex-col justify-start items-center ${dropopen?"flex":"hidden"}`} >

      <div className='flex  justify-center items-center gap-6 mt-1'>
      <img src={user.avatar.url} className='h-20 w-20 cursor-pointer rounded-full'/>
      <div className='w-[70%] '>
      <h1 className='text-gray-900 text-2xl font-semibold'>{user.name}</h1>
      <p className='text-[12px] text-green-500  mt-2'>welcome to ecart ecommerce website . keep shoping !</p>
      </div>
      </div>
      <div className='opt flex flex-col mt-14  gap-4  w-[100%]'onClick={dropopenclose} >
        
      {options.map((item) => (
         <div  className='flex  h-12 text-gray-700 hover:bg-gray-200 cursor-pointer gap-4 bg-gray-100 justify-start items-center p-4' onClick={item.func}>
          {item.icon}
          {item.name}
         </div>
        ))}
      </div>
      </div>:(<div></div>)
    }  
    
    </>
  )
}



export default Navbar
