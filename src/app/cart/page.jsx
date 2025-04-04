// "use client";

// import React, { useEffect, useState } from 'react'
// import Footer from '@/components/Footer'
// import { useDispatch, useSelector } from 'react-redux';
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { TiMinusOutline, TiPlusOutline } from 'react-icons/ti';
// import { fetchCoupons, removeProductFromCart, updateProductQuantity } from '@/redux/slice/CollectionSlice';
// import { FaTruckFast } from "react-icons/fa6";
// import OrderPlacedPopup from '@/components/OrderPlaced';
// import Header from '@/components/Header';



// const CartPage = () => {

//     const [orderDone, setOrderDone] = useState(false);
//     const dispatch = useDispatch()
//     const cart = useSelector((state) => state.Collection.Cart);
//     const coupons = useSelector((state) => state.Collection.coupons);

//     useEffect(() => {
//         dispatch(fetchCoupons());
//     }, [dispatch])

//     const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

//     console.log(coupons)

//     const handleinc = (id, quantity) => {
//         // console.log(quantity);
//         dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
//     }
//     const handledic = (id, quantity) => {
//         if (quantity > 1) {
//             dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
//         } else {
//             dispatch(removeProductFromCart(id));
//             dispatch(updateProductQuantity({ id: id, quantity: 0 }))
//         }
//     }

//     const orderPlace = () => {
//         setOrderDone(true);
//         setTimeout(() => setOrderDone(false), 1000);
//     }

//     return (
//         <>
//             <Header />
//             <div className='wishlist py-5 border-bottom' style={{ overflow: orderDone ? 'hidden' : '', pointerEvents: orderDone ? 'none' : 'auto' }}>
//                 <div className="container">
//                     <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>YOUR SHOPPING CART</h2>

//                     {cart.length <= 0 ? <h2 className='fw-bold' style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</h2>
//                         :
//                         <div className="row justify-content-between">
//                             <div className="border position-relative" style={{ marginRight: '1px', width: '65%', height: '100%' }}>
//                                 <div className="cartTable">
//                                     <div className="row py-2 border-bottom" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
//                                         <div className="col-md-5 fw-bold ps-5">Product</div>
//                                         <div className="col-md-2 fw-bold ps-3" >Price</div>
//                                         <div className="col-md-2 fw-bold ps-3">Quantity</div>
//                                         <div className="col-md-1 fw-bold ps-3">Subtotal</div>
//                                         <div className="col-md-1 fw-bold ps-5">Remove</div>
//                                     </div>
//                                     {cart.map((item, index) => (
//                                         <div key={index} className="row align-items-center border-bottom ps-3 pb-3 mt-3">
//                                             <div className="col-md-5 p-0">
//                                                 <img src={item.thumbnail} alt={item.name} className='img-fluid' style={{ width: '120px' }} />
//                                                 <span className='mx-2'>{item.name}</span>
//                                             </div>
//                                             <div className="col-md-2 ">
//                                                 <span>{item.price}</span>
//                                             </div>
//                                             <div className="col-md-2 d-flex align-items-center">
//                                                 <div className="dic" onClick={() => handledic(item._id, item.quantity)}>
//                                                     <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
//                                                 </div>
//                                                 <span className='mx-2'>{item.quantity}</span>
//                                                 <div className="inc" onClick={() => handleinc(item._id, item.quantity)}>
//                                                     <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-1 ">
//                                                 <span>${item.price * item.quantity}</span>
//                                             </div>
//                                             <div className="col-md-2 ps-5">
//                                                 <span onClick={() => dispatch(removeProductFromCart(item._id))}><RiDeleteBin5Line size={26} /></span>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="border p-0 position-relative" style={{ width: '32%', height: '100%' }}>
//                                 <div className="cartItems border-bottom" style={{ padding: '10px 0' }}>
//                                     <span style={{ fontSize: '12px', color: '#6b7280' }} className='fw-bold d-block px-3'>THERE ARE {cart.length} ITEMS IN YOUR CART</span>
//                                 </div>
//                                 <div className="total p-3" style={{ backgroundColor: '#f2f2f2' }}>
//                                     <div className="d-flex align-items-center justify-content-between mb-2">
//                                         <span className='fw-bold' style={{ fontSize: '14px' }}>DISCOUNT COUPON:</span>
//                                         <input type="text" className='border-0 p-2 w-50 fw-semibold' style={{ fontSize: '12px' }} placeholder='Enter Code' />
//                                     </div>
//                                     <div className="d-flex align-items-center justify-content-between mb-2">
//                                         <span className='fw-bold' style={{ fontSize: '14px' }}>TOTAL:</span>
//                                         <span className='fs-4 fw-bold'>${cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</span>
//                                     </div>
//                                     <div className="d-flex align-items-center justify-content-between mb-4">
//                                         <span className='fw-bold' style={{ fontSize: '14px' }}>SHIPPING:</span>
//                                         <span className='fw-bold' style={{ fontSize: '10px', color: '#6b7280' }}>Shipping & taxes calculated at checkout</span>
//                                     </div>
//                                     <div className="d-flex justify-content-between align-items-center mb-2">
//                                         <span className='fw-bold' style={{ color: 'green' }}>Congratulations! You've got free shipping!</span>
//                                         <FaTruckFast size={26} style={{ marginLeft: '10px', color: 'green' }} />
//                                     </div>
//                                     <span style={{ fontSize: '12px', color: '#6b7280' }}>Free shipping for any orders above <span className='fw-bold' style={{ color: 'green' }}>$200.00</span></span>
//                                     <span className='fw-bold d-block my-3' style={{ fontSize: '14px' }}>Add a note to your order :</span>
//                                     <textarea name="note" id="note" cols={64} rows={7} className='border-0 p-2 fw-bold' style={{ fontSize: '10px' }} placeholder='ADD YOUR NOTE HERE'></textarea>
//                                 </div>
//                                 <button onClick={orderPlace} className='py-1 border-0 text-white fw-bold orderbtn my-2 position-absolute start-50 w-100 translate-middle-x'>PLACE ORDER</button>
//                             </div>
//                         </div>
//                     }
//                 </div>
//             </div>
//             {orderDone && <OrderPlacedPopup />} {/* Show popup when orderDone is true */}

//             <Footer />
//         </>
//     )
// }

// export default CartPage

"use client";

import React, { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiMinusOutline, TiPlusOutline } from 'react-icons/ti';
import { fetchCoupons, removeProductFromCart, updateProductQuantity } from '@/redux/slice/CollectionSlice';
import { FaTruckFast } from "react-icons/fa6";
import OrderPlacedPopup from '@/components/OrderPlaced';
import Header from '@/components/Header';
import { toast } from 'react-toastify';
import Link from 'next/link';


const CartPage = () => {
    const [orderDone, setOrderDone] = useState(false);
    const coupons = useSelector((state) => state.Collection.coupons);
    const cart = useSelector((state) => state.Collection.Cart);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch])

    const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

    const handleinc = (id, quantity) => {
        dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
    }

    const handledic = (id, quantity) => {
        if (quantity > 1) {
            dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
        } else {
            dispatch(removeProductFromCart(id));
            dispatch(updateProductQuantity({ id: id, quantity: 0 }))
        }
    }

    const orderPlace = () => {
        setOrderDone(true);
        setTimeout(() => setOrderDone(false), 1000);
    }

    // Calculate subtotal before any discounts
    const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    return (
        <>
            <Header />
            <div className='wishlist py-5 border-bottom' style={{ overflow: orderDone ? 'hidden' : '', pointerEvents: orderDone ? 'none' : 'auto' }}>
                <div className="container">
                    <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>YOUR SHOPPING CART</h2>

                    {cart.length <= 0 ? <h2 className='fw-bold' style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</h2>
                        :
                        <div className="row justify-content-between">
                            <div className="border position-relative" style={{ marginRight: '1px', width: '65%', height: '100%', boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)' }}>
                                <div className="cartTable" >
                                    <div className="row py-2 border-bottom" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
                                        <div className="col-md-5 fw-bold ps-5">Product</div>
                                        <div className="col-md-2 fw-bold ps-3" >Price</div>
                                        <div className="col-md-2 fw-bold ps-3">Quantity</div>
                                        <div className="col-md-1 fw-bold ps-3">Subtotal</div>
                                        <div className="col-md-1 fw-bold ps-5">Remove</div>
                                    </div>
                                    {cart.map((item, index) => (
                                        <div key={index} className="row align-items-center border-bottom ps-3 pb-3 mt-3">
                                            <div className="col-md-5 p-0">
                                                <img src={item.thumbnail} alt={item.name} className='img-fluid' style={{ width: '120px' }} />
                                                <span className='mx-2'>{item.name}</span>
                                            </div>
                                            <div className="col-md-2 ">
                                                <span>{item.price}</span>
                                            </div>
                                            <div className="col-md-2 d-flex align-items-center">
                                                <div className="dic" onClick={() => handledic(item._id, item.quantity)}>
                                                    <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                                                </div>
                                                <span className='mx-2'>{item.quantity}</span>
                                                <div className="inc" onClick={() => handleinc(item._id, item.quantity)}>
                                                    <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                                                </div>
                                            </div>
                                            <div className="col-md-1 ">
                                                <span>${item.price * item.quantity}</span>
                                            </div>
                                            <div className="col-md-2 ps-5">
                                                <span onClick={() => dispatch(removeProductFromCart(item._id))}><RiDeleteBin5Line size={26} /></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border p-0" style={{
                                width: '33%', height: '100%', position: 'sticky',
                                top: '20px',
                                maxHeight: 'calc(100vh - 40px)',
                                overflowY: 'auto',
                                boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)'
                            }}>
                                <div className="cartItems border-bottom" style={{ padding: '10px 0' }}>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }} className='fw-bold d-block px-3'>THERE ARE {cart.length} ITEMS IN YOUR CART</span>
                                </div>
                                <div className="total p-3" style={{ backgroundColor: '#f2f2f2' }}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className='fw-bold' style={{ fontSize: '14px' }}>TOTAL:</span>
                                        <span className='fs-4 fw-bold'>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className='fw-bold' style={{ fontSize: '14px' }}>SHIPPING:</span>
                                        <span className='fw-bold' style={{ fontSize: '10px', color: '#6b7280' }}>Shipping & taxes calculated at checkout</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className='fw-bold' style={{ color: 'green' }}>Congratulations! You've got free shipping!</span>
                                        <FaTruckFast size={26} style={{ marginLeft: '10px', color: 'green' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Free shipping for any orders above <span className='fw-bold' style={{ color: 'green' }}>$200.00</span></span>
                                    <span className='fw-bold d-block my-2' style={{ fontSize: '14px' }}>Add a note to your order :</span>
                                    <textarea name="note" id="note" cols={64} rows={7} className='border-0 p-2 fw-bold' style={{ fontSize: '10px' }} placeholder='ADD YOUR NOTE HERE'></textarea>
                                </div>
                                <Link href="/checkOut">
                                    <button className='py-3 border-0 text-white fw-bold orderbtn w-100'>CHECK OUT ORDER</button>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {orderDone && <OrderPlacedPopup />}

            <Footer />
        </>
    )
}

export default CartPage