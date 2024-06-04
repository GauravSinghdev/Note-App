import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name){
            setError("Please enter your name");
            return;
        }

        if(!validateEmail(email)){

            if(!email.includes("@"))
            {
                
                setError("Please enter a valid email address");
                return;
            }
            setError("Use the standard email format, like name@example.com");
            return;
        }

        if(!password){
            setError("Please enter the password");
            return;
        }
        setError("");

        //Signup API Call

        try{
            const response = await axiosInstance.post("/create-account",{
                fullName: name,
                email: email,
                password: password,
            });

            //Handle successful registr response
            if(response.data && response.data.error){
                setError(response.data.message);
                return
            }

            if(response.data && response.data.accessToken){
                localStorage.setItem("token", response.data.accessToken)
                navigate('/dashboard');
            }
        } catch(error){
            //Handle registr error
            if(error.response && error.response.data && error.response.data.message)
            {
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occured. Please try again.");
            }
        }
    }

  return (
    <>
        {/* <Navbar/> */}

        <div className='flex items-center justify-center mt-[200px]'>
            <div className='w-96 border-[2px] rounded-[20px] bg-white px-7 py-10 shadow-xl'> 
                <form onSubmit={handleSignUp}>
                    <h4 className='text-3xl font-semibold text-center mb-7'>Signup</h4>

                    <input 
                        type="text"  
                        placeholder='Name'                      
                        className='input-box' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    {error && <p className='text-red-500 text-xs pb-1'>{error}</p> }

                    <button type='submit' className='btn-primary'>Signup</button>

                    <p className='text-sm text-center mt-4 font-semibold'>Already have an account? 
                        <Link to="/login" className=" text-primary underline font-semibold ps-1">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  );
}

export default Signup