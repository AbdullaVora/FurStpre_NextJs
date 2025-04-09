// "use client";

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { FaCheck } from 'react-icons/fa';
// import { toast } from 'react-toastify';
// import { fetchCoupons } from '@/redux/slice/CollectionSlice';

// const CheckoutPage = () => {
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.Collection.Cart);
//     const coupons = useSelector((state) => state.Collection.coupons);

//     // Form states
//     const [email, setEmail] = useState('');
//     const [newsletter, setNewsletter] = useState(true);
//     const [country, setCountry] = useState('United States');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [address, setAddress] = useState('');
//     const [apartment, setApartment] = useState('');
//     const [city, setCity] = useState('');
//     const [state, setState] = useState('');
//     const [zipCode, setZipCode] = useState('');

//     // Coupon states
//     const [couponCode, setCouponCode] = useState('');
//     const [appliedCoupon, setAppliedCoupon] = useState(null);

//     // Fetch coupons on component mount
//     useEffect(() => {
//         dispatch(fetchCoupons());
//     }, [dispatch]);

//     // Filter active coupons
//     const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

//     // Calculate order totals
//     const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const shippingFee = subtotal > 200 ? 0 : 15; // Free shipping over $200

//     // Coupon application logic
//     const applyCoupon = () => {
//         if (!couponCode.trim()) {
//             toast.error('Please enter a coupon code');
//             return;
//         }

//         const coupon = couponsData.find(c =>
//             c.name.toLowerCase() === couponCode.trim().toLowerCase()
//         );

//         if (!coupon) {
//             toast.error('Invalid coupon code');
//             return;
//         }

//         // Check coupon validity dates
//         const currentDate = new Date();
//         const [startDateStr, endDateStr] = coupon.dateDetail.split(' To ');
//         const startDate = new Date(startDateStr);
//         const endDate = new Date(endDateStr);

//         if (currentDate < startDate) {
//             toast.error('This coupon is not valid yet');
//             return;
//         }

//         if (currentDate > endDate) {
//             toast.error('This coupon has expired');
//             return;
//         }

//         if (subtotal < coupon.minAmount) {
//             toast.error(`Minimum order amount of $${coupon.minAmount} required for this coupon`);
//             return;
//         }

//         setAppliedCoupon(coupon);
//         toast.success('Coupon applied successfully!');
//     };

//     const removeCoupon = () => {
//         setAppliedCoupon(null);
//         setCouponCode('');
//         toast.info('Coupon removed');
//     };

//     const calculateDiscount = () => {
//         if (!appliedCoupon) return 0;

//         if (appliedCoupon.Type === 'amount') {
//             return Math.min(appliedCoupon.Value, subtotal); // Ensure discount doesn't exceed subtotal
//         } else if (appliedCoupon.Type === 'percentage') {
//             return (subtotal * appliedCoupon.Value) / 100;
//         }
//         return 0;
//     };

//     const discount = calculateDiscount();
//     const total = Math.max(0, subtotal - discount + shippingFee); // Ensure total doesn't go negative

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission and payment processing
//         console.log({
//             email,
//             firstName,
//             lastName,
//             address,
//             city,
//             state,
//             zipCode,
//             cart,
//             appliedCoupon,
//             subtotal,
//             discount,
//             shippingFee,
//             total
//         });
//     };

//     return (
//         <>
//             <Header />
//             <div className="checkout-page py-5">
//                 <div className="container">
//                     <div className="row">
//                         {/* Left column - Contact and Delivery Info */}
//                         <div className="col-md-7">
//                             <div className="checkout-form mb-5">
//                                 <h2 className="mb-4">Contact</h2>
//                                 <div className="mb-3">
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         placeholder="Email or mobile phone number"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="form-check mb-4">
//                                     <input
//                                         className="form-check-input"
//                                         type="checkbox"
//                                         checked={newsletter}
//                                         onChange={(e) => setNewsletter(e.target.checked)}
//                                         id="newsletterCheck"
//                                     />
//                                     <label className="form-check-label" htmlFor="newsletterCheck">
//                                         Email me with news and offers
//                                     </label>
//                                 </div>

//                                 <h2 className="mb-4">Delivery</h2>
//                                 <div className="mb-3">
//                                     <select
//                                         className="form-select"
//                                         value={country}
//                                         onChange={(e) => setCountry(e.target.value)}
//                                     >
//                                         <option value="United States">United States</option>
//                                         <option value="Canada">Canada</option>
//                                         <option value="United Kingdom">United Kingdom</option>
//                                     </select>
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="First name (optional)"
//                                             value={firstName}
//                                             onChange={(e) => setFirstName(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Last name"
//                                             value={lastName}
//                                             onChange={(e) => setLastName(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Address"
//                                         value={address}
//                                         onChange={(e) => setAddress(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Apartment, suite, etc. (optional)"
//                                         value={apartment}
//                                         onChange={(e) => setApartment(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-5">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="City"
//                                             value={city}
//                                             onChange={(e) => setCity(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="col-md-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="State"
//                                             value={state}
//                                             onChange={(e) => setState(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="col-md-4">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="ZIP code"
//                                             value={zipCode}
//                                             onChange={(e) => setZipCode(e.target.value)}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Right column - Order Summary */}
//                         <div className="col-md-5">
//                             <div className="order-summary p-4 border rounded">
//                                 <h3 className="mb-4">Order Summary</h3>

//                                 {cart.map((item, index) => (
//                                     <div key={index} className="d-flex justify-content-between align-items-center mb-3">
//                                         <div className="d-flex align-items-center">
//                                             <img
//                                                 src={item.thumbnail}
//                                                 alt={item.name}
//                                                 className="img-thumbnail me-3"
//                                                 style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//                                             />
//                                             <div>
//                                                 <h6 className="mb-1">{item.name}</h6>
//                                                 <small className="text-muted">
//                                                     {item.size && `${item.size} / `}
//                                                     {item.color}
//                                                 </small>
//                                                 <div className="text-muted">Qty: {item.quantity}</div>
//                                             </div>
//                                         </div>
//                                         <div className="text-end">
//                                             <div>${(item.price * item.quantity).toFixed(2)}</div>
//                                         </div>
//                                     </div>
//                                 ))}

//                                 <hr className="my-3" />

//                                 {/* Coupon Section */}
//                                 <div className="mb-3">
//                                     <div className="d-flex justify-content-between align-items-center mb-2">
//                                         <span className="fw-bold">Coupon Code</span>
//                                         {appliedCoupon ? (
//                                             <div className="d-flex align-items-center">
//                                                 <span className="text-success me-2">{appliedCoupon.name}</span>
//                                                 <button
//                                                     onClick={removeCoupon}
//                                                     className="btn btn-sm btn-outline-danger"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <div className="d-flex justify-content-end">
//                                                 <input
//                                                     type="text"
//                                                     value={couponCode}
//                                                     onChange={(e) => setCouponCode(e.target.value)}
//                                                     className="form-control w-75 fw-semibold"
//                                                     placeholder="Enter coupon code"
//                                                 />
//                                                 <button
//                                                     onClick={applyCoupon}
//                                                     className="btn btn-sm btn-primary ms-2"
//                                                 >
//                                                     Apply
//                                                 </button>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Order Totals */}
//                                 <div className="mb-2 d-flex justify-content-between">
//                                     <span>Subtotal</span>
//                                     <span>${subtotal.toFixed(2)}</span>
//                                 </div>

//                                 {appliedCoupon && (
//                                     <div className="mb-2 d-flex justify-content-between text-danger">
//                                         <span>Discount ({appliedCoupon.name})</span>
//                                         <span>-${discount.toFixed(2)}</span>
//                                     </div>
//                                 )}

//                                 <div className="mb-2 d-flex justify-content-between">
//                                     <span>Shipping</span>
//                                     <span>
//                                         {shippingFee === 0 ? (
//                                             <span className="text-success">
//                                                 <FaCheck className="me-1" />
//                                                 Free
//                                             </span>
//                                         ) : (
//                                             `$${shippingFee.toFixed(2)}`
//                                         )}
//                                     </span>
//                                 </div>

//                                 <hr className="my-3" />

//                                 <div className="d-flex justify-content-between fw-bold fs-5">
//                                     <span>Total</span>
//                                     <span>USD ${total.toFixed(2)}</span>
//                                 </div>

//                                 <button
//                                     onClick={handleSubmit}
//                                     className="btn btn-dark w-100 mt-4 py-3"
//                                     disabled={!address || !city || !state || !zipCode || !email}
//                                 >
//                                     Complete Order
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default CheckoutPage;
"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaCheck, FaCreditCard, FaMoneyBill, FaPaypal } from 'react-icons/fa';
import { SiRazorpay, SiStripe, SiPaytm, SiGooglepay, SiPhonepe } from 'react-icons/si';
import { toast, ToastContainer } from 'react-toastify';
import { fetchCoupons, fetchPaymentsMethods, fetchProducts } from '@/redux/slice/CollectionSlice';
import apiInstance from '@/api/instance';
import OrderPlacedPopup from '@/components/OrderPlaced';

const CheckoutPage = () => {
    const dispatch = useDispatch();




    const cart = useSelector((state) => state.Collection.Cart);
    const { coupons, loading: Loading } = useSelector((state) => state.Collection);
    const mockPaymentMethods = useSelector((state) => state.Collection.paymentMethods);

    // console.log("final cart: ",cart)

    const [orderPlaced, setOrderPlaced] = useState(false)
    const [userId, setUserId] = useState(null);
    // Form states
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(true);
    const [country, setCountry] = useState('United States');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Payment method states
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(true);

    // Credit card states (for card-based payment methods)
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [savePaymentInfo, setSavePaymentInfo] = useState(false);

    // UPI payment state
    const [upiId, setUpiId] = useState('');

    // Coupon states
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);


    // get id and email
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userEmail = localStorage.getItem('userEmail');
        setUpiId(userId);
        setEmail(userEmail);
    }, [dispatch])


    // Fetch coupons and payment methods on component mount
    useEffect(() => {
        dispatch(fetchCoupons());
        dispatch(fetchProducts())
        dispatch(fetchPaymentsMethods());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            setOrderPlaced(false)
        }, 1000);
    }, [orderPlaced])

    // Process payment methods whenever mockPaymentMethods changes
    useEffect(() => {
        // Filter only active payment methods
        const activePaymentMethods = mockPaymentMethods.filter(method => method.status === true);

        setPaymentMethods(activePaymentMethods);

        // Set default payment method if available
        if (activePaymentMethods.length > 0 && !selectedPaymentMethod) {
            setSelectedPaymentMethod(activePaymentMethods[0]._id);
        }

        setIsLoadingPaymentMethods(false);
    }, [mockPaymentMethods, selectedPaymentMethod]);

    // Get payment method icon based on method name
    const getPaymentIcon = (methodName) => {
        const name = methodName.toLowerCase();
        if (name.includes('paytm')) return <SiPaytm size={24} color="#00BAF2" />;
        if (name.includes('cash')) return <FaMoneyBill size={24} color="#2E7D32" />;
        if (name.includes('paypal')) return <FaPaypal size={24} color="#003087" />;
        if (name.includes('razor')) return <SiRazorpay size={24} color="#072654" />;
        if (name.includes('stripe')) return <SiStripe size={24} color="#635BFF" />;
        if (name.includes('gpay') || name.includes('google pay')) return <SiGooglepay size={24} color="#4285F4" />;
        if (name.includes('phonepe')) return <SiPhonepe size={24} color="#5f259f" />;
        if (name.includes('upi') || name.includes('net banking')) return <FaCreditCard size={24} color="#3366CC" />;
        return <FaCreditCard size={24} />;
    };

    // Check if a payment method needs card details
    const needsCardDetails = (methodName) => {
        const name = methodName.toLowerCase();
        return name.includes('stripe') || name.includes('credit') || name.includes('debit');
    };

    // Check if a payment method needs UPI ID
    const needsUpiDetails = (methodName) => {
        const name = methodName.toLowerCase();
        return name.includes('upi') || name.includes('gpay') || name.includes('google pay') ||
            name.includes('phonepe') || name.includes('paytm') || name.includes('net banking');
    };

    // Filter active coupons
    const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

    // Calculate order totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal > 200 ? 0 : 15; // Free shipping over $200

    // Format credit card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    // Format expiry date (MM/YY)
    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

        if (v.length <= 2) {
            return v;
        }

        let month = v.substring(0, 2);
        let year = v.substring(2, 4);

        if (parseInt(month) > 12) {
            month = '12';
        }

        return `${month}/${year}`;
    };

    // Coupon application logic
    const applyCoupon = () => {
        if (!couponCode.trim()) {
            toast.error('Please enter a coupon code');
            return;
        }

        const coupon = couponsData.find(c =>
            c.name.toLowerCase() === couponCode.trim().toLowerCase()
        );

        if (!coupon) {
            toast.error('Invalid coupon code');
            return;
        }

        // Check coupon validity dates
        const currentDate = new Date();
        const [startDateStr, endDateStr] = coupon.dateDetail.split(' To ');
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        if (currentDate < startDate) {
            toast.error('This coupon is not valid yet');
            return;
        }

        if (currentDate > endDate) {
            toast.error('This coupon has expired');
            return;
        }

        if (subtotal < coupon.minAmount) {
            toast.error(`Minimum order amount of ${coupon.minAmount} required for this coupon`);
            return;
        }

        setAppliedCoupon(coupon);
        toast.success('Coupon applied successfully!');
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        toast.info('Coupon removed');
    };

    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;

        if (appliedCoupon.Type === 'amount') {
            return Math.min(appliedCoupon.Value, subtotal); // Ensure discount doesn't exceed subtotal
        } else if (appliedCoupon.Type === 'percentage') {
            return (subtotal * appliedCoupon.Value) / 100;
        }
        return 0;
    };

    const discount = calculateDiscount();
    const total = Math.max(0, subtotal - discount + shippingFee); // Ensure total doesn't go negative

    // Get selected payment method details
    const getSelectedPaymentMethod = () => {
        return paymentMethods.find(method => method._id === selectedPaymentMethod) || null;
    };

    const validatePaymentDetails = () => {
        if (!selectedPaymentMethod) {
            toast.error('Please select a payment method');
            return false;
        }

        const method = getSelectedPaymentMethod();
        if (!method) return false;

        // Validate card details for Stripe or other card-based payment methods
        if (needsCardDetails(method.paymentMethod)) {
            if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 16) {
                toast.error('Please enter a valid card number');
                return false;
            }
            if (!cardName.trim()) {
                toast.error('Please enter the name on your card');
                return false;
            }
            if (!expiryDate.trim() || expiryDate.length < 5) {
                toast.error('Please enter a valid expiry date');
                return false;
            }
            if (!cvv.trim() || cvv.length < 3) {
                toast.error('Please enter a valid CVV');
                return false;
            }
        }

        // Validate UPI ID for UPI payment methods
        if (needsUpiDetails(method.paymentMethod)) {
            if (!upiId.trim() || !upiId.includes('@')) {
                toast.error('Please enter a valid UPI ID (e.g. name@upi)');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!userId){
            toast.error('Please Login First');
            return;
        }

        if (!validatePaymentDetails()) {
            return;
        }

        const selectedMethod = getSelectedPaymentMethod();

        // Handle form submission and payment processing
        const orderData = {
            orderCode: `ORDER-${Date.now()}`,
            email,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            paymentMethod: selectedMethod ? selectedMethod.paymentMethod : '',
            paymentMode: selectedMethod ? selectedMethod.paymentMode : '',
            paymentKey: selectedMethod ?
                (selectedMethod.paymentMode === 'test' ? selectedMethod.testKey : selectedMethod.liveKey) : '',
            cardDetails: needsCardDetails(selectedMethod?.paymentMethod) ? {
                cardNumber: cardNumber.replace(/\s/g, ''),
                cardName,
                expiryDate,
                cvv,
                savePaymentInfo
            } : null,
            upiDetails: needsUpiDetails(selectedMethod?.paymentMethod) ? {
                upiId
            } : null,
            cart,
            appliedCoupon,
            subtotal,
            discount,
            shippingFee,
            total
        };

        console.log(orderData)

        if (orderData) {
            sendOrder(orderData)
        }

        // toast.success('Order placed successfully!');
        setOrderPlaced(true)

    };

    const sendOrder = async (orderData) => {
        try {
            const response = await apiInstance.post('/api/dashboard/addOrder', orderData);
            if (response.status === 201) {
                toast.success('Order placed successfully!', { autoClose: 2000 });
                router.push('/');
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        }
    }

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="checkout-page py-5">
                <div className="container">
                    <div className="row">
                        {/* Left column - Contact and Delivery Info */}
                        <div className="col-md-7">
                            <div className="checkout-form mb-5">
                                <h2 className="mb-4">Contact</h2>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email or mobile phone number"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-check mb-4">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={newsletter}
                                        onChange={(e) => setNewsletter(e.target.checked)}
                                        id="newsletterCheck"
                                    />
                                    <label className="form-check-label" htmlFor="newsletterCheck">
                                        Email me with news and offers
                                    </label>
                                </div>

                                <h2 className="mb-4">Delivery</h2>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First name (optional)"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Apartment, suite, etc. (optional)"
                                        value={apartment}
                                        onChange={(e) => setApartment(e.target.value)}
                                    />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-5">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="ZIP code"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Payment Method Section */}
                                <h2 className="mb-4 mt-5">Payment Method</h2>

                                {isLoadingPaymentMethods ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading payment methods...</span>
                                        </div>
                                        <p className="mt-2">Loading payment methods...</p>
                                    </div>
                                ) : paymentMethods.length === 0 ? (
                                    <div className="alert alert-warning">
                                        No payment methods available. Please try again later.
                                    </div>
                                ) : (
                                    <div className="payment-methods mb-4">
                                        <div className="row">
                                            {paymentMethods.map((method) => (
                                                <div className="col-md-6 mb-3" key={method._id}>
                                                    <div
                                                        className={`payment-method-card p-3 border rounded d-flex align-items-center ${selectedPaymentMethod === method._id ? 'border-primary' : ''}`}
                                                        onClick={() => setSelectedPaymentMethod(method._id)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <div className="me-3">
                                                            {getPaymentIcon(method.paymentMethod)}
                                                        </div>
                                                        <div>
                                                            <div className="fw-bold">{method.paymentMethod}</div>
                                                            <small className="text-muted">{method.paymentMode === 'test' ? 'Test Mode' : 'Live Mode'}</small>
                                                        </div>
                                                        {selectedPaymentMethod === method._id && (
                                                            <div className="ms-auto">
                                                                <FaCheck className="text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Payment method specific forms */}
                                {selectedPaymentMethod && (
                                    <div className="payment-details mb-4">
                                        {(() => {
                                            const method = getSelectedPaymentMethod();
                                            if (!method) return null;

                                            const methodName = method.paymentMethod.toLowerCase();

                                            // Stripe payment form (needs card details)
                                            if (needsCardDetails(method.paymentMethod)) {
                                                return (
                                                    <div className="credit-card-details">
                                                        <div className="mb-3">
                                                            <label className="form-label">Card Number</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="1234 5678 9012 3456"
                                                                value={cardNumber}
                                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                                maxLength={19}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Name on Card</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="John Smith"
                                                                value={cardName}
                                                                onChange={(e) => setCardName(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Expiry Date (MM/YY)</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="MM/YY"
                                                                    value={expiryDate}
                                                                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                                                    maxLength={5}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">CVV</label>
                                                                <input
                                                                    type="password"
                                                                    className="form-control"
                                                                    placeholder="123"
                                                                    value={cvv}
                                                                    onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                                                                    maxLength={4}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="form-check mb-3">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={savePaymentInfo}
                                                                onChange={(e) => setSavePaymentInfo(e.target.checked)}
                                                                id="savePaymentCheck"
                                                            />
                                                            <label className="form-check-label" htmlFor="savePaymentCheck">
                                                                Save this payment method for future purchases
                                                            </label>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            // UPI payment methods (Google Pay, PhonePe, Paytm, etc.)
                                            else if (needsUpiDetails(method.paymentMethod)) {
                                                return (
                                                    <div className="upi-details">
                                                        <div className="mb-3">
                                                            <label className="form-label">UPI ID</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="yourname@upi"
                                                                value={upiId}
                                                                onChange={(e) => setUpiId(e.target.value)}
                                                                required
                                                            />
                                                            <small className="text-muted">
                                                                Enter your UPI ID (e.g., yourname@okaxis, yourname@ybl)
                                                            </small>
                                                        </div>
                                                        <div className="alert alert-info">
                                                            <small>
                                                                You will receive a payment request on your UPI app. Please complete the payment within 5 minutes.
                                                            </small>
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            // Cash on delivery
                                            else if (methodName.includes('cash')) {
                                                return (
                                                    <div className="alert alert-success">
                                                        <strong>Cash on Delivery</strong> - Pay when your order is delivered.
                                                        Please have the exact amount ready.
                                                    </div>
                                                );
                                            }

                                            // Default message for other payment methods
                                            return (
                                                <div className="alert alert-info">
                                                    You will be redirected to the payment gateway after clicking "Complete Order".
                                                </div>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right column - Order Summary with Shadow Effect */}
                        <div className="col-md-5 end-0 rounded" style={{
                            position: 'sticky',
                            top: '20px',
                            maxHeight: 'calc(100vh - 40px)',
                            overflowY: 'auto',
                            boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)'
                        }}>
                            <div className="order-summary p-4 rounded" style={{ backgroundColor: '#fff' }}>
                                <h3 className="mb-4 fw-bold">Order Summary</h3>

                                <div className="order-items" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {cart.map((item, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-2 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.name}
                                                    className="rounded me-3"
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                                />
                                                <div>
                                                    <h6 className="mb-1">{item.name}</h6>
                                                    <small className="text-muted">
                                                        {item.size && `${item.size} / `}
                                                        {item.color}
                                                    </small>
                                                    <div className="text-muted">Qty: {item.quantity}</div>
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <div className="fw-semibold">{(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <hr className="my-4" />

                                {/* Coupon Section */}
                                <div className="mb-4 rounded">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-bold">Coupon Code</span>
                                        {appliedCoupon ? (
                                            <div className="d-flex align-items-center">
                                                <span className="text-success me-2">{appliedCoupon.name}</span>
                                                <button
                                                    onClick={removeCoupon}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="d-flex justify-content-end">
                                                <input
                                                    type="text"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                    className="form-control w-75 fw-semibold"
                                                    placeholder="Enter coupon code"
                                                />
                                                <button
                                                    onClick={applyCoupon}
                                                    className="btn btn-sm btn-primary ms-2"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order Totals */}
                                <div className="mb-2 d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span className="fw-semibold">{subtotal.toFixed(2)}</span>
                                </div>

                                {appliedCoupon && (
                                    <div className="mb-2 d-flex justify-content-between text-danger">
                                        <span>Discount ({appliedCoupon.name})</span>
                                        <span className="fw-semibold">-{discount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="mb-3 d-flex justify-content-between">
                                    <span>Shipping</span>
                                    <span>
                                        {shippingFee === 0 ? (
                                            <span className="text-success">
                                                <FaCheck className="me-1" />
                                                Free
                                            </span>
                                        ) : (
                                            `${shippingFee.toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between fw-bold fs-5 mt-3 rounded">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="btn btn-dark w-100 mt-4 py-3 fw-bold"
                                    disabled={!address || !city || !state || !zipCode || !email || !selectedPaymentMethod}
                                >
                                    Complete Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer />
            {orderPlaced && <OrderPlacedPopup />}
        </>
    );
};

export default CheckoutPage;