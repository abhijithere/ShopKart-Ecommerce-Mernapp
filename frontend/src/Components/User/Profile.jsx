import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import Loader from '../Layout/Loader.jsx';

function Profile() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
     navigate(`/login`);
     
    }
  }, [isAuthenticated]);

  return (
    <>
    
    {
      loading?(<Loader/>):(
        <>
        <div className='  mt-20 flex flex-col justify-start items-center -mb-32'>
        <div className='h-60 bg-gray-800 w-full flex items-center  gap-40'>

      <img src={user.avatar.url} className='h-96 w-72 rounded-xl cursor-pointer mt-72  ml-20 rou border-[7px] border-t-green-500 border-b-red-500 border-r-yellow-500 border-l-blue-500'/>
      <h1 className='text-gray-100 text-4xl'> Welcome ! <span className='text-yellow-400 text-4xl'>{user.name}</span></h1>
        </div>

        <div className='h-96 p-6 bg-gray-100 w-[60%] ml-[500px] -mt-14 rounded-xl shadow-xl border'>
          <h1 className='text-2xl text-gray-500'>Basic Info :</h1>
          <div  className='mt-10 flex gap-3'>
            <div className='h-32 w-72 bg-green-300 p-3 flex flex-col justify-start items-center rounded-xl'>
              <h1 className='text-sm text-gray-700'>Full Name</h1>
              <p className='mt-5 text-xl font-semibold'>{user.name}</p>
            </div>
            <div className='h-32 w-96 bg-red-300 p-3 flex flex-col justify-start items-center rounded-xl'>
              <h1 className='text-sm text-gray-700'>Email Address</h1>
              <p className='mt-5 text-xl font-semibold'>{user.email}</p>
            </div>
            <div className='h-32 w-52 bg-blue-300 p-3 flex flex-col justify-start items-center rounded-xl'>
              <h1 className='text-sm text-gray-700'>Role</h1>
              <p className='mt-5 text-xl font-semibold'>{user.role}</p>
            </div>
          </div>
        <div className=' flex justify-center items-center gap-6'>
          <button  className='h-12 rounded-lg  font-semibold text-white w-60 bg-red-500 mt-16  ' >My Orders</button>
          <Link to={"/password/update"} ><button  className='h-12 rounded-lg  font-semibold text-white w-60 bg-green-500 mt-16  ' >Change Password</button></Link>
          </div>
        </div>
      </div>

        <Link to={"/me/update"} ><button className='h-12 rounded-lg  font-semibold text-white w-60 bg-green-500 mt-16 absolute ml-[103px]'  >Edit Profile</button>
</Link>
      
        </>
      )
    }
      
    </>
  )
}

export default Profile
