"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import Header from '@/components/Header';

const ResetPassword = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Get email from localStorage or sessionStorage if available
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }

        const resetPermission = localStorage.getItem('resetPermission');
        if (!resetPermission) {
            router.push('/forgot');
        }

        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setInput(prev => ({ ...prev, email: storedEmail }));
        } else {
            // If no email is found, redirect back to forgot password page
            toast.error('Session expired. Please restart password reset process.', { autoClose: 2000 });
            setTimeout(() => {
                router.push('/forgot');
            }, 2000);
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const validatePassword = () => {
        // Password validation rules
        if (input.password.length < 8) {
            toast.error('Password must be at least 8 characters long', { autoClose: 2000 });
            return false;
        }

        if (input.password !== input.confirmPassword) {
            toast.error('Passwords do not match', { autoClose: 2000 });
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()) {
            return;
        }

        setLoading(true);

        try {
            const response = await apiInstance.post('/api/auth/reset-password', {
                email: input.email,
                password: input.password
            });

            if (response.status === 200) {
                toast.success('Password reset successfully', { autoClose: 2000 });

                // Clear stored email
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('resetPermission');

                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <h2 className='text-center fw-bolder display-5 mt-3 mt-md-5 mb-3 mb-md-5'>ACCOUNT</h2>
                <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5 px-2">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <h4 className='fw-bold mb-2'>RESET PASSWORD</h4>
                        <span className='d-block' style={{ fontSize: '13px' }}>Create a new password for your account</span>

                        {loading ? (
                            <div className='loader-container'>
                                <span className="loader"></span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label" style={{ fontSize: '13px' }}>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={input.email || ''}
                                        onChange={handleChange}
                                        className='form-control py-2 py-md-3'
                                        placeholder='YOUR EMAIL'
                                        readOnly
                                        disabled
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label" style={{ fontSize: '13px' }}>New Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            value={input.password || ''}
                                            onChange={handleChange}
                                            className='form-control py-2 py-md-3'
                                            placeholder='NEW PASSWORD'
                                            required
                                        />
                                        <div
                                            className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: '13px' }}>Confirm Password</label>
                                    <div className="position-relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={input.confirmPassword || ''}
                                            onChange={handleChange}
                                            className='form-control py-2 py-md-3'
                                            placeholder='CONFIRM PASSWORD'
                                            required
                                        />
                                        <div
                                            className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>

                                <span style={{ fontSize: '13px', opacity: '80%' }}>
                                    Remember your password? <Link href="/login" className='text-decoration-none text-black'>
                                        <span className='greenHover fw-bold'>Login Here.</span>
                                    </Link>
                                </span>

                                <button
                                    className='d-block w-100 mt-3 py-2 py-md-3 border-0 fw-semibold text-white rounded-1'
                                    type='submit'
                                >
                                    Reset Password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default ResetPassword