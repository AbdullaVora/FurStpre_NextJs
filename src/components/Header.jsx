'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { RiHeart2Line, RiHeartLine, RiStarSmileLine, RiUserHeartLine } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import SideBar from './SideBar';
import CartBar from './CartBar';
import { useSelector } from 'react-redux';
import SideNav from './SideNav';

const Header = () => {
    const [sideBar, setSideBar] = useState(false);
    const [sideNav, setNavBar] = useState(false);
    const [cartBar, setCartBar] = useState(false);
    const [Cartcount, setCartCount] = useState(0);
    const [Wishcount, setWishCount] = useState(0);

    const cart = useSelector((state) => state.Collection.Cart);
    const wish = useSelector((state) => state.Collection.WishList);

    useEffect(() => {
        setCartCount(cart.length)
        setWishCount(wish.length)
    }, [cart, wish])

    const closeSideBar = () => {
        setSideBar(false);
        setCartBar(false);
        setNavBar(false);
    };

    return (
        <>
            <SideBar openSlide={sideBar} closeSideBar={closeSideBar} />
            <CartBar openSlide={cartBar} closeSideBar={closeSideBar} />
            <SideNav openSlide={sideNav} closeSideBar={closeSideBar} />
            <div
                className={`trans-bg vh-100 w-100 position-fixed top-0 start-0 ${sideBar || sideNav || cartBar ? 'd-block' : 'd-none'}`}
                onClick={() => { setSideBar(false); setCartBar(false); setNavBar(false); }}
                style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: '998' }}
            ></div>
            <div className="shadow-sm">
                <div className="container-lg">
                    <header className='p-3 d-flex align-items-center justify-content-between'>
                        <div className="logo">
                            <img src="/images/Logo.webp" alt="logo" className='img-fluid' />
                        </div>
                        <nav className='d-md-flex d-none'>
                            <Link href='/' className='px-2 py-2 px-lg-4 text-decoration-none'>Home</Link>
                            <Link href='/collection' className='px-2 py-2 px-lg-4 text-decoration-none'>Collection</Link>
                            <Link href='/blog' className='px-2 py-2 px-lg-4 text-decoration-none'>Blog</Link>
                            <Link href='/about' className='px-2 py-2 px-lg-4 text-decoration-none'>About Us</Link>
                            <Link href='/contact' className='px-2 py-2 px-lg-4 text-decoration-none'>Contact Us</Link>
                        </nav>
                        <div className='icons d-flex align-items-center'>
                            {/* <FiSearch size={38} className='me-2 rounded-3 p-2 iconHover' /> */}
                            <FaRegUser size={38} className='me-sm-2 me-1 rounded-3 px-2 iconHover' onClick={() => setSideBar(true)} />
                            <div className="wish position-relative">
                                <Link href="/wishlist" className='text-decoration-none text-black'><RiHeart2Line size={40} className='me-sm-2 me-1 rounded-3 px-2 pt-1 iconHover' /></Link>
                                <sup className='position-absolute end-0 translate-middle rounded-circle text-white' style={{ backgroundColor: '#0a5d5d', padding: '8px 6px', top: '28%'}}>{Wishcount}</sup>
                            </div>
                            <div className="cart position-relative">
                                <HiOutlineShoppingCart size={38} className='me-sm-2 me-1 rounded-3 px-2 iconHover' onClick={() => setCartBar(true)} />
                                <sup className='position-absolute end-0 translate-middle rounded-circle text-white' style={{ backgroundColor: '#0a5d5d', padding: '8px 6px', top: '22%' }}>{Cartcount}</sup>
                            </div>
                            <div className="navIcon d-md-none">
                                <MdMenuOpen size={40} className='rounded-3 p-1 iconHover' onClick={() => setNavBar(true)} />
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default Header;
