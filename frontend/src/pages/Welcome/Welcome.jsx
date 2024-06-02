import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='bg-[rgba(56,14,104,255)] w-4/5 rounded my-[100px] mx-auto'>
      <div className='flex items-center'>
        <div className='w-5/6 mx-[40px]'>
        <h1 className='text-[50px] font-bold text-white  pt-[20px]'>Welcome to our website . . .</h1>
        <p className='text-white text-[20px] mt-[30px]'>NoteMaster - Your Ultimate Note-Taking Companion</p>


        <Link to="/login">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >Get Started</button>
        </Link>
        

        </div>

        <div className='h-[80vh] w-full bg-blue-600'>
          <img src="https://cdn.pixabay.com/photo/2016/08/01/10/14/maze-1560761_1280.png" alt="loading" className='h-[80vh] w-full' />
        </div>
      
      </div>
    </div>
  )
}

export default Welcome