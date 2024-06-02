import React from 'react';
import { IoReturnDownForwardSharp } from "react-icons/io5";

const EmptyCard = () => {
  return (
    <div>
        <div className='h-auto w-auto max-h-[80%] max-w-[100%] mt-[50px] mx-auto'>
            <img 
                src="https://cdn.pixabay.com/photo/2014/12/27/15/34/notebook-581128_1280.jpg" 
                alt="loading" 
                className='max-h-[40vh] w-full object-contain' 
            />

            <p className='mt-6 text-[40px] text-center bg-green-200'>Notes are Empty.</p>
        </div>

        <p className='float-right p-2 mt-[180px] text-[30px]'>
            <span className='bg-black text-white p-5'>Click here and start creating your note!</span> 
        <IoReturnDownForwardSharp className='w-20 h-20 float-right mt-10 ms-[-50px]' />
        </p>
        
    </div>
  );
};

export default EmptyCard;
