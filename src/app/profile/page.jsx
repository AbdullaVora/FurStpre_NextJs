"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import Header from '@/components/Header';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [originalData, setOriginalData] = useState({
        name: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState(null)

    useEffect(() => {
        const name = localStorage.getItem("user");
        const email = localStorage.getItem("userEmail");
        const id = localStorage.getItem("userId");
        setId(id)
        setFormData({
            name: name || '',
            email: email || '',
        });
        setOriginalData({
            name: name || '',
            email: email || ''
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const hasChanges = () => {
        return formData.name !== originalData.name ||
            formData.email !== originalData.email
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasChanges()) {
            toast.info('No changes made', { autoClose: 2000 });
            return;
        }

        console.log(formData)

        setIsLoading(true);
        try {
            const response = await apiInstance.put(`/api/auth/editUser/${id}`, formData);

            if (response.status === 200) {
                toast.success('Profile updated successfully', { autoClose: 2000 });
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('userEmail', response.data.email);
                setOriginalData({
                    name: response.data.name,
                    email: response.data.email
                });
                setFormData(prev => ({
                    ...prev
                }));
            } else {
                toast.error(response.data.message || 'Update failed', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Update failed', { autoClose: 2000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid px-3">
                <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>PROFILE</h2>
                <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <h4 className='fw-bold mb-2'>USER DATA</h4>
                        <form onSubmit={handleSubmit}>
                            <label className='mt-3'>Full Name: </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR NAME'
                                value={formData.name}
                            />
                            <label className='mt-3'>E-Mail: </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR EMAIL'
                                value={formData.email}
                            />
                            {/* <div className="position-relative mt-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    className='form-control py-3'
                                    placeholder='ENTER NEW PASSWORD (leave blank to keep current)'
                                    value={formData.password}
                                />
                                <button
                                    type="button"
                                    className="position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 me-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div> */}
                            <Link href="/forgot" className='text-decoration-none text-black'>
                                <span style={{ fontSize: '12px' }} className='d-flex mb-2 align-items-center mt-2'>
                                    <IoIosMail color='#0a5d5d' size={20} className='me-1' />
                                    Forgot Your <span className='fw-bold greenHover'>&nbsp;Password ?</span>
                                </span>
                            </Link>
                            <button
                                className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
                                type='submit'
                                disabled={!hasChanges() || isLoading}
                                style={{
                                    backgroundColor: !hasChanges() ? '#cccccc' : '#0a5d5d',
                                    cursor: !hasChanges() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Profile