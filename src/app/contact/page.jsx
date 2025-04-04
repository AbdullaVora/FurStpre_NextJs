"use client";

import React from 'react'
import { FaFacebookF, FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa";
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const ContactUs = () => {
    return (
        <>
            <Header />
            <div className='contact pb-5 border-bottom'>
                <div className="container">
                    <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>CONTACT US</h2>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.54586602985!2d72.73989463380968!3d21.15918020356955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1731992594469!5m2!1sen!2sin"
                        width="100%"
                        height="550"
                        style={{ border: '0', borderRadius: '20px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="mb-4 mb-md-0"
                    ></iframe>

                    <div className="row align-items-center mt-4">
                        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                            <form action="">
                                <h4 className='mt-3 mt-md-5 fw-bold'>GET IN TOUCH</h4>
                                <p>Please enter the details of your request. A member of our support staff will respond as soon as possible.</p>
                                <div className="row mb-3">
                                    <div className="col-md-6 col-12 mb-3 mb-md-0">
                                        <input
                                            type="text"
                                            name="name"
                                            className='form-control fw-semibold opacity-75'
                                            placeholder='YOUR NAME'
                                        />
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <input
                                            type="email"
                                            name="email"
                                            className='form-control fw-semibold opacity-75'
                                            placeholder='YOUR EMAIL'
                                        />
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    name="number"
                                    className='form-control mb-3 fw-semibold opacity-75'
                                    placeholder='YOUR PHONE NUMBER'
                                />
                                <textarea
                                    rows={5}
                                    name="message"
                                    className='form-control fw-semibold opacity-75 mb-3'
                                    placeholder='YOUR MESSAGE'
                                />
                                <button
                                    className='py-2 px-5 border-0 text-white mt-3 rounded-2'
                                    type='submit'
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="col-lg-6 col-md-12 px-lg-5 px-md-3">
                            <p className='fs-6 mb-3'><span className='fw-bold'>Address: </span>123 Suspendis matti, Visaosang Building VST District, NY Accums, North American</p>
                            <p className='mb-3'><span className='fw-bold'>Email: </span>support@domain.com</p>
                            <p className='mb-3'><span className='fw-bold'>Call Us: </span>(012)-345-67890</p>
                            <p className='mb-4'><span className='fw-bold'>Opening Store: </span>Our store has re-opened for shopping, exchanges every day 11am to 7pm</p>
                            <div className="d-flex gap-3">
                                <a href="#" className='text-dark'><FaFacebookF className='social' size={45} /></a>
                                <a href="#" className='text-dark'><FaInstagram className='social' size={45} /></a>
                                <a href="#" className='text-dark'><FaPinterestP className='social' size={45} /></a>
                                <a href="#" className='text-dark'><FaTwitter className='social' size={45} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs