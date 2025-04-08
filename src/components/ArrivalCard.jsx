import React, { useState } from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiStarSmileLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addProductToCart, addToWishList, fetchProducts, removeFromWishList } from '../redux/slice/CollectionSlice';
import { useRouter } from 'next/navigation';

const ArrivalCard = ({ id, img, title, price, isCollection, iswish }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleHover = () => setHover(!hover);

  const onDetail = () => {
    router.push(`/productDetails/${id}`);
  };

  const handleCart = (id) => {
    dispatch(addProductToCart({id: id}));
    toast.dismiss()
    toast.success('Product Added to Cart');
  };

  const handleWish = (id) => {
    dispatch(addToWishList(id));
    toast.success('Product Added to WishList');
  };

  return (
    <div
      className="arrivalCard position-relative overflow-hidden px-2"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="img" onClick={onDetail}>
        <img
          src={img}
          alt="arrival-img"
          style={{ width: isCollection || iswish ? '280px' : '195px', height: isCollection || iswish ? '350px' : '240px' }}
          className="img-fluid"
        />
      </div>
      <div className={`content text-center ${isCollection || iswish ? "mb-5 mt-3" : "mb-5 mt-3"}`}>
        <h6 className="fw-normal">{title}</h6>
        <span style={{ display: hover && !isCollection ? 'none' : 'block' }}>{price}</span>
      </div>

      {!isCollection && (
        <button
          onClick={() => iswish ? dispatch(removeFromWishList(id)) : onDetail(id)}
          className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-2"
        >
          {iswish ? 'Remove Wish' : 'Quick Add'}
        </button>
      )}

      <div className="sideIcons">
        <div className="cart" onClick={() => handleCart(id)}>
          <HiOutlineShoppingCart size={14} />
        </div>
        <div className="star" onClick={() => handleWish(id)}>
          <RiStarSmileLine size={17} />
        </div>
      </div>

      {/* Toast Notification */}
      {!isCollection && (
        <ToastContainer
          position="top-right"
          autoClose={1000}
        />
      )}
    </div>
  );
};

export default ArrivalCard;
