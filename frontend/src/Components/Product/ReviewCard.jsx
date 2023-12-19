import React from 'react'
import { Rating } from "@material-ui/lab";

function ReviewCard({review}) {
    
    // const options1 = {
    //     edit: false,
    //     color: "rgba(20,20,20,0.1)",
    //     activeColor: "tomato",
    //     value: review.reting,
    //     isHalf: true,
    //     size: window.innerWidth < 600 ? 20 : 25
    //   }

    const options1 = {
      size: "medium",
      value: review.reting,
      readOnly: true,
      precision: 0.5,
    };
  return (
    
    <>
    <div className=' flex mt-20 h-52 w-fit p-5 bg-gray-100 gap-8 rounded-xl border border-b-4 border-b-green-400 shadow-sm'>
        <div className='h-20 w-20'>
            <img src="/img/pic1.jpg" alt="" className='h-20 w-20 rounded-full' />
        </div>
        <div>
        <Rating {...options1}/>
        <h1 className='text-xl font-semibold'>{review.name}</h1>
        <p className='w-96 text-gray-600 mt-2'>{review.comment}</p>

        </div>

      
    </div>

    </>
  )
}

export default ReviewCard
