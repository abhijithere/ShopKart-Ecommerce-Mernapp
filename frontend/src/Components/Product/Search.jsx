import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Search() {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState("");
  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`);
    }else{
      navigate('/products')
    }
  }
  return (
    <>
      <form className='search  flex justify-center items-center gap-4' onSubmit={searchSubmitHandler}  >
        <input
        type='text'
        placeholder='search a product ....'
        onChange={(e)=> setkeyword(e.target.value)}
        className='w-96 p-3 rounded-full shadow-lg px-10 border border-b-2 text-xl border-b-green-400 outline-none caret-green-400 text-slate-500'
        />
      <input type='submit' value="search" className='w-28 p-3 bg-green-200 rounded-full shadow-lg' />
      </form>
    </>
  )
}

export default Search
