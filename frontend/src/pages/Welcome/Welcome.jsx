import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'; // Create and import a CSS file for additional styles

const Welcome = () => {
  return (
    <div className='bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 w-11/12 sm:w-4/5 rounded-lg mt-16 mx-auto p-6 sm:p-10 shadow-lg'>
      <div className='flex flex-col lg:flex-row items-center'>
        <div className='w-full lg:w-5/12 mx-auto lg:mx-10 text-center lg:text-left animate-fadeIn'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white pt-4 leading-tight animate-bounceIn'>
            Welcome to NoteMaster
          </h1>
          <p className='text-white text-base sm:text-lg md:text-xl mt-4 animate-fadeIn'>
            Your Ultimate Note-Taking Companion
          </p>

          <Link to="/login">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 sm:px-5 py-2.5 mb-2 mt-5 transition transform hover:scale-105"
            >
              Get Started
            </button>
          </Link>
        </div>

        <div className='w-full lg:w-7/12 mt-6 lg:mt-0'>
          <img
            src="https://cdn.pixabay.com/photo/2015/05/31/15/08/blank-792125_1280.jpg"
            alt="Welcome"
            className='h-60 sm:h-80 lg:h-96 w-full object-cover rounded-lg shadow-lg animate-fadeIn'
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
