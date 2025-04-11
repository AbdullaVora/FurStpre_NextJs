// import Link from "next/link";
// import { HiOutlineShoppingCart } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { MdOutlineRemoveShoppingCart } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { useEffect, useState } from "react";
// import { removeProductFromCart, updateProductQuantity } from "../redux/slice/CollectionSlice";


// const Cart = ({ id, img, title, price, quantity}) => {
//     const dispatch = useDispatch();

//     const handleinc = () => {
//         console.log(quantity);
//         dispatch(updateProductQuantity({id: id, quantity: quantity + 1}))
//     }
//     const handledic = () => {
//         if (quantity > 1) {
//             dispatch(updateProductQuantity({id: id, quantity: quantity - 1}))
//         } else {
//             dispatch(removeProductFromCart(id));
//             dispatch(updateProductQuantity({id: id, quantity: 0}))
//         }
//     }
//     console.log(quantity);


//     return (
//         <div className="cart p-3">
//             <div className="d-flex">
//                 <img src={img} alt={title} className="img-fluid" style={{ width: '150px' }} />
//                 <div className="mx-4 mt-2">
//                     <h6 className="fw-bold">{title}</h6>
//                     <span className="fw-bold">${price * quantity}.00</span>
//                     <div className="quantity d-flex align-items-center mt-2">
//                         <div className="dic" onClick={handledic}>
//                             <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
//                         </div>
//                         <span className="px-3">{quantity}</span>
//                         <div className="inc" onClick={handleinc}>
//                             <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
//                         </div>
//                         <div className="delete mx-4" onClick={() => (dispatch(removeProductFromCart(id)))}>
//                             <RiDeleteBin5Line size={20} className="cursor-pointer" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const CartBar = ({ openSlide, closeSideBar }) => {
//     const cart = useSelector((state) => state.Collection.Cart);

//     const [total, setTotal] = useState(0);

//     // Safely parse cart data
//     const parsedCart = cart
//         ? cart.map(item => JSON.parse(item)).flat()
//         : [];

//     useEffect(() => {
//         let newTotal = 0;
//         parsedCart.forEach(item => (newTotal += item.price * item.quantity));
//         setTotal(newTotal);
//     }, [parsedCart]);


//     return (
//         <div className="Cartbar position-relative">
//             <div
//                 className={`slide position-fixed bg-white`}
//                 style={{
//                     zIndex: "999",
//                     top: 0,
//                     right: openSlide ? 0 : "-30%",
//                     height: "100vh",
//                     width: "25%",
//                     transition: "right 0.3s ease-in-out",
//                 }}
//             >
//                 <div className="topBar border-bottom p-3">
//                     <div className="d-flex align-items-start justify-content-between">
//                         <div className="cartHead">
//                             <HiOutlineShoppingCart size={25} />
//                             <span className="ms-1 fw-bold">CART</span>
//                         </div>
//                         <IoClose size={30} style={{ cursor: "pointer" }} onClick={closeSideBar} />
//                     </div>
//                 </div>

//                 {/* Render Cart Items or Show Empty Message */}
//                 <div className="d-flex flex-column py-1 align-items-center" style={{ maxHeight: "calc(80vh - 60px)", overflowY: "auto" }}>
//                     {parsedCart.length === 0 ? (
//                         <div className="emptyCart d-flex flex-column py-5 align-items-center">
//                             <MdOutlineRemoveShoppingCart size={70} />
//                             <h2 className="fs-4 text-center mt-3">Your cart is empty</h2>
//                         </div>
//                     ) : (
//                         parsedCart.map((item, index) => (
//                             <Cart key={index} id={item.id} img={item.img} price={item.price} quantity={item.quantity} title={item.title} />

//                         ))
//                     )}
//                 </div>
//                 <div className="cart position-absolute translate-middle start-50 z-5 bg-white w-100 px-3" style={{ height: '220px', bottom: '-18%', boxShadow: '2px' }}>
//                     <div className="d-flex justify-content-between">
//                         <h6 className="fw-bold my-3 fs-6">TOTAL</h6>
//                         <h6 className="fw-bold my-3 fs-6">${total}.00</h6>
//                     </div>
//                     <Link href='/cart' className="text-decoration-none"><button className="btn btn-dark fw-bold  mt-2 w-100 d-block" onClick={closeSideBar}>VIEW CART</button></Link>
//                     <Link href="/collection" className="text-decoration-none"><button onClick={closeSideBar} className="btn cartbtn fw-bold btn-dark mt-2 w-100 d-block">ADD TO CART</button></Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartBar;

import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { removeProductFromCart, updateProductQuantity } from "../redux/slice/CollectionSlice";
import { usePreventScroll } from "@/hook/usePreventScroll";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const Cart = ({ id, img, title, price, quantity }) => {
    const dispatch = useDispatch();

    const handleinc = () => {
        dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
    }
    const handledic = () => {
        if (quantity > 1) {
            dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
        } else {
            dispatch(removeProductFromCart(id));
            dispatch(updateProductQuantity({ id: id, quantity: 0 }))
        }
    }

    return (
        <div className="cart p-3 border-bottom">
            <div className="d-flex align-items-center">
                <img
                    src={img}
                    alt={title}
                    className="img-fluid"
                    style={{ width: '100px', maxWidth: '150px' }}
                />
                <div className="mx-3 flex-grow-1">
                    <h6 className="fw-bold mb-2">{title}</h6>
                    <span className="fw-bold d-block mb-2">{price * quantity}</span>
                    <div className="quantity d-flex align-items-center">
                        <div className="dic" onClick={handledic}>
                            <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                        </div>
                        <span className="px-3">{quantity}</span>
                        <div className="inc" onClick={handleinc}>
                            <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                        </div>
                        <div className="delete ms-auto" onClick={() => (dispatch(removeProductFromCart(id)))}>
                            <RiDeleteBin5Line size={20} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartBar = ({ openSlide, closeSideBar }) => {
    const cart = useSelector((state) => state.Collection.Cart);

    const [total, setTotal] = useState(0);
    const router = useRouter()

    // Safely parse cart data
    const parsedCart = cart
        ? cart.map(item => (item))
        : [];

    useEffect(() => {
        let newTotal = 0;
        parsedCart.forEach(item => (newTotal += item.price * item.quantity));
        setTotal(newTotal);
    }, [parsedCart]);

    usePreventScroll(openSlide);

    const handleCheckOut = () => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            closeSideBar();
            router.push("/checkout")
        } else {
            toast.error("Please Login First")
        }
    }

    return (
        <div className="Cartbar position-relative">
            <div
                className={`
                    slide 
                    position-fixed 
                    bg-white 
                    h-100 
                    ${openSlide ? 'show-sidebar' : 'hide-sidebar'}
                `}
                style={{
                    zIndex: '999',
                    top: 0,
                    width: '100%', // Full width on mobile
                    maxWidth: '350px', // Maximum width
                    right: 0,
                    transition: 'transform 0.3s ease-in-out',
                    transform: openSlide ? 'translateX(0)' : 'translateX(100%)',
                    overscrollBehavior: 'contain'
                }}
            >
                <div className="topBar border-bottom p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="cartHead d-flex align-items-center">
                            <HiOutlineShoppingCart size={25} />
                            <span className="ms-2 fw-bold">CART</span>
                        </div>
                        <IoClose
                            size={30}
                            style={{ cursor: "pointer" }}
                            onClick={closeSideBar}
                        />
                    </div>
                </div>

                {/* Cart Items Container */}
                <div
                    className="cart-items-container py-1"
                    style={{
                        maxHeight: "calc(100vh - 300px)",
                        overflowY: "auto"
                    }}
                >
                    {parsedCart.length === 0 ? (
                        <div className="emptyCart d-flex flex-column py-5 align-items-center text-center">
                            <MdOutlineRemoveShoppingCart size={70} className="text-muted" />
                            <h2 className="fs-4 mt-3">Your cart is empty</h2>
                        </div>
                    ) : (
                        parsedCart.map((item, index) => (
                            <Cart
                                key={index}
                                id={item._id}
                                img={item.thumbnail}
                                price={item.price}
                                quantity={item.quantity}
                                title={item.name}
                            />
                        ))
                    )}
                </div>

                {/* Total and Action Buttons */}
                <div
                    className="cart-summary position-absolute bottom-0 start-0 w-100 bg-white p-3 border-top"
                    style={{
                        boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <h6 className="fw-bold fs-6">TOTAL</h6>
                        <h6 className="fw-bold fs-6">{total}</h6>
                    </div>
                    <Link href='/cart' className="text-decoration-none">
                        <button
                            className="btn btn-dark fw-bold w-100 mb-2"
                            onClick={closeSideBar}
                        >
                            VIEW CART
                        </button>
                    </Link>
                    <button
                        onClick={handleCheckOut}
                        className="btn btn-dark fw-bold w-100"
                    >
                        CHECK OUT
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CartBar;