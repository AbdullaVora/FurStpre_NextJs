"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {

    const [input, setInput] = useState({});
    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    }

    const loginUser = async () => {
        try {
            const response = await apiInstance.post('/api/auth/login', input);
            if (response.status === 200) {
                toast.success('Login Success', { autoClose: 2000 });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.name);
                router.push('/');
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        }
    }

    return (
        <>
            <Header />
            <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>ACCOUNT</h2>
            <div className="d-flex flex-column align-items-center justify-contant-center py-5">
                <div className="login" style={{ width: "500px" }}>
                    <h4 className='fw-bold mb-2'>SIGN IN</h4>
                    <span className='d-block' style={{ fontSize: '13px' }}>Insert Your Account Information: </span>
                    <form onSubmit={handleSubmit} >
                        <input type="text" name="email" id="email" onChange={handleChange} className='form-control mt-3 py-3' placeholder='ENTER YOUR EMAIL' />
                        <input type="password" name="password" id="password" onChange={handleChange} className='form-control mt-3 py-3 mb-2' placeholder='ENTER YOUR PASSWORD' />
                        <Link href="#" className='text-decoration-none text-black'><span style={{ fontSize: '12px' }} className='d-flex mb-2 align-items-center'><IoIosMail color='#0a5d5d' size={20} className='me-1' />Forgot Your <span className='fw-bold greenHover'>&nbsp;Password ?</span></span></Link>
                        <span style={{ fontSize: '13px', opacity: '80%' }}>If you don't have an account, please <Link href="/register" className='text-decoration-none text-black'><span className='greenHover fw-bold'>Register Here.</span></Link></span>
                        <button className='d-block w-100 mt-2 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>Login</button>
                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Login
