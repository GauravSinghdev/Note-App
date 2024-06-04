import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'; // Create and import a CSS file for additional styles

const Welcome = () => {
  return (
    <div className='bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 w-4/5 rounded-lg mt-[60px] mx-auto p-10 shadow-lg'>
      <div className='flex items-center'>
        <div className='w-5/6 mx-[40px] animate-fadeIn'>
          <h1 className='text-[50px] font-bold text-white pt-[20px] leading-tight animate-bounceIn'>Welcome to NoteMaster</h1>
          <p className='text-white text-[20px] mt-[30px] animate-fadeIn'>Your Ultimate Note-Taking Companion</p>

          <Link to="/login">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-5 transition transform hover:scale-105"
            >
              Get Started
            </button>
          </Link>
        </div>

        <div className='h-[80vh] w-full'>
          <img
            src="https://cdn.pixabay.com/photo/2015/05/31/15/08/blank-792125_1280.jpg"
            alt="Welcome"
            className='h-[80vh] w-full object-cover rounded-lg shadow-lg animate-fadeIn'
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
