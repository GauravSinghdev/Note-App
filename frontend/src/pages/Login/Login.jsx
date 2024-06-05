import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      if (!email.includes("@")) {
        setError("Please enter a valid email address");
        return;
      }
      setError("Use the standard email format, like name@example.com");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'>
      <div className='w-96 border-[5px] rounded-[20px] bg-white px-7 py-10 mt-[-100px]'>
        <form onSubmit={handleLogin}>
          <h4 className='text-3xl font-semibold text-center mb-7'>Login</h4>

          <input
            type="text"
            placeholder='Email'
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4 font-semibold'>Not registered yet?
            <Link to="/signup" className="font-semibold text-primary underline ps-1">Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
