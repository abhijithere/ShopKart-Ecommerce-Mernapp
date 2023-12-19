import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../Layout/Loader';
import Products from './Products';
import Search from './Search';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import './Product.css'
import Slider from '@material-ui/core/Slider'
import {useAlert} from "react-alert"




const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

function AllProductDetails() {

  const {keyword}=useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setcurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  const { products, loading, error, productsCount,resultPerPage } = useSelector(
    (state) => state.products
  )
    const setCurrentpageNo = (e)=>{
      setcurrentPage(e)
    }

    const [price, setPrice] = useState([0, 25000]); 
    const [close, setclose] = useState(true);

    const openfilter = ()=>{
      setclose(false);
    }

    const handleChange = (event, newValues) => {
      setPrice(newValues);
    };
    const closeHandeler =()=>{
      setclose(true);
    }
    
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors)
    }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);

  return (
    <>
      {
        loading ? <Loader /> :
          <>
            <div className={`fixed overflow-hidden  h-[100%] w-[100%]  bg-[#00000066]  z-40  ${close?"hidden":" "}`}> </div>
           
          <div className='flex justify-center  '>
          <div className={`fixed z-50 top-40 cursor-pointer right-[27%] bg-[#00000035] rounded-full p-3 ${close?"hidden":"flex "} justify-center items-center`} onClick={closeHandeler}>
              <img src="./img/closeimg.png" alt=""  className='h-7 '/>
            </div>
       <div className={`fixed  h-96 w-[37%] bg-gray-100 shadow-lg top-[30%] p-10 rounded-2xl z-50  ${close?"hidden":" "} `}>
              <div className='text-xl  text-slate-700'>Price</div>
              <Slider
        value={price}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={25000}
        color="primary" 
        
        
      />
              <div className='text-xl  text-slate-700 mb-4 mt-4'>Categories</div>
            <ul className="categoryBox grid grid-cols-4 gap-3 ">
              {categories.map((category) => (
                <li
                  className="category-link cursor-pointer bg-green-300 p-2 text-sm text-slate-900  shadow-lg text-center  rounded-3xl "
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
            <div className='text-xl  text-slate-700 mt-8 mb-2'>Ratings </div>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>
            </div>
            <div className='text-center mt-32 flex- justify-center items-center  font-semibold text-3xl  '><h className='w-52 h-20 p-4 border-b-4 border-gray-200  text-orange-600 text-center '>Products</h></div>
            <div className='flex justify-center items-center mt-16  '>

            <Search/>
            <button type='submit' value="search" className='w-28 p-3 bg-blue-200 rounded-full shadow-lg ml-2' onClick={openfilter} >Filter</button>

            
            </div>
            <div className=' flex flex-col justify-center items-center mt-16'>
            <div className='grid grid-cols-4 gap-8'>
              {
                products && products.map((product) => (
                  <Products key={product._id} product={product} />
                ))
              }
            </div>
<div className='-mb-44'>
            <div className='paginationBox  '>
              {
                resultPerPage<productsCount && (
                  <Pagination 
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentpageNo}
              nextPageText={"next"}
              prevPageText={"prev"}
              firstPageText={"1st"}
              lastPageText={"last"}
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
              />
                )
              }
            </div>
            </div>
            </div>

          </>
      }
    </>
  )
}

export default AllProductDetails
