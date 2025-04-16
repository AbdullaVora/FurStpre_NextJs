"use client";

import React, { useEffect } from 'react'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import ArrivalCard from '@/components/ArrivalCard';
import Header from '@/components/Header';
import { getUserWishlist } from '@/redux/slice/wishSlice';

const WishListComp = () => {
    const { wishList = [], loading: Loading } = useSelector((state) => state.wish);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserWishlist())
    }, [dispatch])

    console.log(wishList)

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }
    
    return (
        <>
            {/* <Header /> */}
            <div className='wishlist py-5 border-bottom'>
                <div className="container">
                    <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>PAGE WISHLIST</h2>
                    {!wishList || wishList.length === 0 ? 
                        <h4 className='fw-bold' style={{ textAlign: 'center' }}>Your WishList Is Empty</h4>
                        :
                        <div className={`cards d-flex flex-wrap ${wishList.length >= 4 ? "justify-content-between" : "justify-content-start"}`}>
                            {wishList.map((card, index) => (
                                <ArrivalCard
                                    key={index}
                                    img={card.product.thumbnail}
                                    id={card.product._id}
                                    title={card.product.name}
                                    price={card.product.price}
                                    iswish={true}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default WishListComp