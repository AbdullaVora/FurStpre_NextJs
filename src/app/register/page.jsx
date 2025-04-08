// "use client";

// import React, { useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import apiInstance from '@/api/instance';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from '@/components/Header';

// const Register = () => {
//     const [input, setInput] = useState({});
//     const router = useRouter();

//     const handleInput = (e) => {
//         const { name, value } = e.target;
//         setInput({ ...input, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         registerUser();
//     };

//     const registerUser = async () => {
//         try {
//             const response = await apiInstance.post('/api/auth/register', input);
//             console.log("response: ", response);

//             if (response.status === 200) {
//                 // Show success toast
//                 toast.success('Account created successfully!', { autoClose: 2000 });
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('user', response.data.name);
//                 router.push('/');
//             }
//         } catch (error) {
//             // Show error toast
//             toast.error('Registration failed. Please try again.', { autoClose: 2000 });
//         }
//     };


//     return (
//         <>
//             <Header />
//             <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>CREATE ACCOUNT</h2>
//             <div className="d-flex flex-column align-items-center justify-contant-center py-5">
//                 <div className="login" style={{ width: "500px" }}>
//                     {/* <h4 className='fw-bold mb-2'>SIGN IN</h4>
//                     <span className='d-block' style={{ fontSize: '13px' }}>Insert Your Account Information: </span> */}
//                     <form onSubmit={handleSubmit} >
//                         <input type="text" name="name" id="name" onChange={handleInput} className='form-control mt-3 py-3' placeholder='ENTER YOUR NAME' />
//                         <input type="text" name="email" id="email" onChange={handleInput} className='form-control mt-3 py-3' placeholder='ENTER YOUR EMAIL' />
//                         <input type="number" name="mobile" id="mobile" onChange={handleInput} className='form-control mt-3 py-3' placeholder='ENTER YOUR MOBILE NUMBER' />
//                         <input type="password" name="password" onChange={handleInput} id="" className='form-control mt-3 py-3 mb-2' placeholder='ENTER YOUR PASSWORD' />
//                         <span style={{ fontSize: '13px', opacity: '80%' }}>If you have an account, please <Link href='/login' className='text-decoration-none text-black'><span className='greenHover fw-bold'>Login Here.</span></Link></span>
//                         <button className='d-block w-100 mt-2 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>Register</button>
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer />
//         </>
//     )
// }

// export default Register

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

const Register = () => {
    const [input, setInput] = useState({});
    const [phone, setPhone] = useState('');
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
            <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>CREATE ACCOUNT</h2>
            <div className="d-flex flex-column align-items-center justify-contant-center py-5">
                <div className="login" style={{ width: "500px" }}>
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
                                className='form-control mt-3 py-3'
                                placeholder="ENTER YOUR PHONE NUMBER"
                                required
                            />
                        </div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleInput}
                            className='form-control mt-3 py-3 mb-2'
                            placeholder='ENTER YOUR PASSWORD'
                            required
                            minLength="6"
                        />
                        <span style={{ fontSize: '13px', opacity: '80%' }}>
                            If you have an account, please <Link href='/login' className='text-decoration-none text-black'><span className='greenHover fw-bold'>Login Here.</span></Link>
                        </span>
                        <button className='d-block w-100 mt-2 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>Register</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register