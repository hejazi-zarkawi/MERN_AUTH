import React from 'react'
import { MdEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import Input from '../component/Input';
import { FiLoader } from "react-icons/fi";
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useAuthStore } from '../store/AuthStore';
import toast from "react-hot-toast";
const LoginPage = () => {

    const navigate = useNavigate
    const {login, error, isLoading}= useAuthStore()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Logged in successfully!!!")
            navigate("/")
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden"
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>Welcome Back</h2>

                <form onSubmit={handleLogin}>
                    <Input
                        icon={MdEmail}
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className='relative mb-6'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <TbLockPassword className='size-5 text-green-500' />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                            {showPassword ? <IoIosEyeOff className='size-5 text-green-500 cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}} /> : <IoIosEye className='size-5 text-green-500 cursor-pointer' onClick={()=>{setShowPassword(!showPassword)}} />}
                    </div>
                    </div>

                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

                    <div>
                    <Link to={"/forgot-password"} className='text-green-400 hover:underline'>
                        Forgot password?
                    </Link>
                    </div>

                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                        font-bold rounded-lg shadow-lg hover:from-green-600
                        hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                         focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                    >
                        {isLoading ? <FiLoader className='animate-spin mx-auto' /> : "Login"}
                    </motion.button>
                </form>

            </div>

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Don't have an account?{" "}
                    <Link to={"/signup"} className='text-green-400 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>


        </motion.div>
    )
}

export default LoginPage