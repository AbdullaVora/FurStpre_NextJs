"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import apiInstance from '@/api/instance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [input, setInput] = useState({});
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Format phone number with country code and space
        const formattedPhone = phone ? `+${phone.replace(/\D/g, '').replace(/(\d{2})(\d+)/, '$1 $2')}` : '';
        registerUser({ ...input, mobile: formattedPhone });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const registerUser = async (userData) => {
        try {
            const response = await apiInstance.post('/api/auth/register', userData);
            console.log("response: ", response);

            if (response.status === 200) {
                // Show success toast
                toast.success('Account created successfully!', { autoClose: 2000 });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userEmail', response.data.email);
                router.push('/');
            }
        } catch (error) {
            // Show error toast
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.', { autoClose: 2000 });
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid px-3">
                <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>CREATE ACCOUNT</h2>
                <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInput}
                                className='form-control mt-3 py-3'
                                placeholder='ENTER YOUR NAME'
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInput}
                                className='form-control mt-3 py-3'
                                placeholder='ENTER YOUR EMAIL'
                                required
                            />
                            <div className='mt-3'>
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={setPhone}
                                    className='form-control py-3'
                                    placeholder="ENTER YOUR PHONE NUMBER"
                                    required
                                />
                            </div>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleInput}
                                    className='form-control mt-3 py-3 mb-2'
                                    placeholder='ENTER YOUR PASSWORD'
                                    required
                                    minLength="6"
                                />
                                <button
                                    type="button"
                                    className="position-absolute end-0 top-0 bg-transparent border-0 h-100 px-3"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <span style={{ fontSize: '13px', opacity: '80%' }}>
                                If you have an account, please <Link href='/login' className='text-decoration-none text-black'><span className='greenHover fw-bold'>Login Here.</span></Link>
                            </span>
                            <button className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>Register</button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Register