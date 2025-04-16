import React, { useState } from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiStarSmileLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { addProductToCart, fetchProducts } from '../redux/slice/addToCartSlice';
import { useRouter } from 'next/navigation';



const OurProductBox = ({ id, img, title, Cwidth, price }) => {
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch()

    const router = useRouter()

    const handleHover = () => setHover(!hover);
    const products = useSelector(state => state.addToCart.products);

    useEffect(() => {
        dispatch(fetchProducts());
        const id = localStorage.getItem('userId');
        setUserId(id)
    }, [dispatch])

    const onDetail = (id) => {
        router.push(`/productDetails/${id}`)
    }

    const handleCart = (id) => {
        dispatch(addProductToCart({ userId, id, products: products[0] }));
    };

    const handleWish = (id) => {
        dispatch(addToWishList(id));
    };

    return (
        <div
            className="arrivalCard position-relative overflow-hidden mt-5"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={{ width: Cwidth ? '100%' : '226px' }}
            data-aos="zoom-in" data-aos-delay="150"

        >
            <div className="img" onClick={() => onDetail(id)}>
                <img
                    src={img}
                    alt="arrival-img"
                    className="img-fluid"
                />
            </div>
            <div className="content mt-3 mb-3 text-center">
                <h6 className="fw-normal">{title}</h6>
                <span>{price}</span>
            </div>
            <div className="sideIcons">
                <div className="cart" onClick={() => handleCart(id)}>
                    <HiOutlineShoppingCart size={14} />
                </div>
                <div className="star" onClick={() => handleWish(id)}>
                    <RiStarSmileLine size={17} />
                </div>
            </div>
        </div>
    );
};

export default OurProductBox;
