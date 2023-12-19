import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from "@material-ui/lab";



function Products({ product }) {
  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   value: product.ratings,
  //   isHalf: true,
  //   size: window.innerWidth < 600 ? 20 : 25
  // }
  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>

      <Link className='productCard  m- w-72  flex  flex-col justify-center items-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md' to={`/product/${product._id}`}>
        <div className=' flex  overflow-hidden p-5 justify-center'>
          <img src={product.images[0].url} className=' object-cover rounded-lg h-80 w-72' />
        </div>
        <p className='text-xl text-gray-600'>{product.name}</p>
        <span className='text-2xl font-bold '>{`₹${product.price}`}</span>
        <div className='flex  justify-center items-center mb-6 mt-2'>
          <Rating {...options} /><span>({product.numberofReviews} Reviews)</span>
        </div>
      </Link>
    </>
  )
}

export default Products
