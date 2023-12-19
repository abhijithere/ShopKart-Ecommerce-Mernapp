import React, { useEffect } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./style.css"
import Products from '../Product/Products';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector,useDispatch } from 'react-redux';
import Loader from './Loader';
import { useAlert } from 'react-alert';

function Home() {
  const alert=useAlert();
  const dispatch = useDispatch();
  const {loading,error,products,productsCount}=useSelector(
    (state)=>state.products
  )
  useEffect(() => {
    if(error){
       alert.error("error");
       dispatch(clearErrors())
    }

    dispatch(getProduct());
  }, [dispatch,error,alert]);


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
     
  return (
    <>
    {loading?(<Loader/>):(
      <>
        {/* slider part------------------------------------------------------- */}
 <div className='slider part overflow-hidden   '>
    <div className="slider-container ">
      <Slider {...settings} className=''>
        <div className='x1 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x2 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x3 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x4 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x5 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x6 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
       
        <div className='x7 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x8 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x9 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x10 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
        <div className='x11 h-[700px] bg-orange-0   flex  items-center bg-cover ' >
              <div className='bg-[#1d1b1b94] w- h-full flex flex-col justify-center items-center'>
              <h1 className=' text-6xl text-center  text-gray-300 mt-60 font-poppin'>
              <span className='text-teal-300'>Hey want</span> to buy a Tank <br></br>
                Top?
              </h1>
              <p className=' text-lg text-slate-200 w-[60%] text-center mt-10'>If you're launching an online store but want to minimize your initial outlay, Ecwid is the best place to begin but is the best place to begin but </p>
              <button className='h-14 w-40 bg-[#1d1b1bb3] text-white mt-10 hover:bg-[#1d1b1b58] rounded-lg'>Shop now</button>
              </div>
        </div>
       
      </Slider>
    </div>
    </div>
        {/* slider  end------------------------------------------------------- */}
        <div className='flex justify-center items-center mt-16 -mb-20'>
        <div className="classcontainer grid grid-cols-4 place-items-center gap-6">

        {
          products && products.map(product=>(

            <Products product = {product}/>
          ))
        }
       

        </div>
        </div>
      </>
    )}
  
   
    </>
  )
}

export default Home
