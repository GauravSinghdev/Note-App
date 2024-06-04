import React, { useState } from 'react';
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

    //Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //Handle login error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2016/12/18/12/49/cyber-security-1915626_1280.png')" }}>
            <div className='w-96 border-[2px] rounded-[20px] bg-white px-7 py-10 shadow-xl'> 
        <form onSubmit={handleLogin}>
          <h4 className='text-3xl font-semibold text-center mb-7'>Login</h4>
          <input
            type="text"
            placeholder='Email'
            className='input-box mb-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type='submit' className='btn-primary w-full py-2 mt-4'>Login</button>
          <p className='text-sm text-center mt-4 font-semibold'>Not registered yet?
            <Link to="/signup" className="font-semibold text-primary underline ml-1">Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
