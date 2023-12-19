import React from 'react'

function Loader() {
  return (
    <>
      <div className='h-screen  flex justify-center  items-center bg-[#413f3f32]'>
      <div
        className="border-teal-500 inline-block h-28 w-28 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </div>
    </>
  )
}

export default Loader
