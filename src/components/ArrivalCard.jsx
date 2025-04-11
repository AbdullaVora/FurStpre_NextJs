// import React, { useState } from 'react';
// import { HiOutlineShoppingCart } from "react-icons/hi";
// import { RiHeart2Line, RiHeart3Line, RiHeartLine, RiStarSmileLine } from "react-icons/ri";
// import { useDispatch } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { addProductToCart, addToWishList, fetchProducts, removeFromWishList } from '../redux/slice/CollectionSlice';
// import { useRouter } from 'next/navigation';

// const ArrivalCard = ({ id, img, title, price, isCollection, iswish }) => {
//   const [hover, setHover] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleHover = () => setHover(!hover);

//   const onDetail = () => {
//     router.push(`/productDetails/${id}`);
//   };

//   const handleCart = (id) => {
//     dispatch(addProductToCart({ id: id }));
//     toast.dismiss()
//     toast.success('Product Added to Cart');
//   };

//   const handleWish = (id) => {
//     dispatch(addToWishList(id));
//     toast.success('Product Added to WishList');
//   };

//   return (
//     <div
//       className="arrivalCard position-relative overflow-hidden px-2"
//       onMouseEnter={handleHover}
//       onMouseLeave={handleHover}
//     >
//       <div className="img shadow-lg" onClick={onDetail}>
//         <img
//           src={img}
//           alt="arrival-img"
//           style={{ cursor: 'pointer', width: isCollection || iswish ? '280px' : '195px', height: isCollection || iswish ? '350px' : '240px' }}
//           className="img-fluid"
//         />
//       </div>
//       <div className={`content text-center ${isCollection || iswish ? "mb-5 mt-3" : "mb-5 mt-3"}`}>
//         <h6 className="fw-normal text-truncate" style={{cursor: 'pointer'}} onClick={onDetail}>{title}</h6>
//         <span style={{ display: hover && !isCollection ? 'none' : 'block' }}>{price}</span>
//       </div>

//       {!isCollection && (
//         <button
//           onClick={() => iswish ? dispatch(removeFromWishList(id)) : onDetail(id)}
//           className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-5"
//         >
//           {iswish ? 'Remove Wish' : 'Quick Add'}
//         </button>
//       )}

//       <div className="sideIcons">
//         <div className="cart" onClick={() => handleCart(id)}>
//           <HiOutlineShoppingCart size={14} />
//         </div>
//         <div className="star" onClick={() => handleWish(id)}>
//           <RiHeart2Line size={18} />
//         </div>
//       </div>

//       {/* Toast Notification */}
//       {!isCollection && (
//         <ToastContainer
//           autoClose={1000}
//         />
//       )}
//     </div>
//   );
// };

// export default ArrivalCard;


import React, { useState } from 'react';
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { RiHeart2Line, RiHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addProductToCart, addToWishList, fetchProducts, removeFromWishList } from '../redux/slice/CollectionSlice';
import { useRouter } from 'next/navigation';

const ArrivalCard = ({ id, img, title, price, isCollection, iswish }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get cart and wishlist from Redux store
  const cart = useSelector(state => state.Collection.Cart);
  const wishList = useSelector((state) => state.Collection.WishList);

  // Check if product is in cart
  const isInCart = cart.some(item => item._id === id);

  // Check if product is in wishlist
  const isInWishlist = wishList.some(item => item._id === id);

  const handleHover = () => setHover(!hover);

  const onDetail = () => {
    router.push(`/productDetails/${id}`);
  };

  const handleCart = (id) => {
    if (isInCart) {
      toast.dismiss();
      // Optionally add functionality to remove from cart
      toast.info('Product is already in cart');
    } else {
      dispatch(addProductToCart({ id: id }));
      toast.dismiss();
      toast.success('Product Added to Cart');
    }
  };

  const handleWish = (id) => {
    if (isInWishlist) {
      dispatch(removeFromWishList(id));
      toast.success('Product Removed from WishList');
    } else {
      dispatch(addToWishList(id));
      toast.success('Product Added to WishList');
    }
  };

  return (
    <div
      className="arrivalCard position-relative overflow-hidden px-2"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="img shadow-lg" onClick={onDetail}>
        <img
          src={img}
          alt="arrival-img"
          style={{ cursor: 'pointer', width: isCollection || iswish ? '280px' : '195px', height: isCollection || iswish ? '350px' : '240px' }}
          className="img-fluid"
        />
      </div>
      <div className={`content text-center ${isCollection || iswish ? "mb-5 mt-3" : "mb-5 mt-3"}`}>
        <h6 className="fw-normal text-truncate" style={{ cursor: 'pointer' }} onClick={onDetail}>{title}</h6>
        <span style={{ display: hover && !isCollection ? 'none' : 'block' }}>{price}</span>
      </div>

      {!isCollection && (
        <button
          onClick={() => iswish ? dispatch(removeFromWishList(id)) : onDetail(id)}
          className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-5"
        >
          {iswish ? 'Remove Wish' : 'Quick Add'}
        </button>
      )}

      <div className="sideIcons">
        <div className="cart" onClick={() => handleCart(id)}>
          {isInCart ? (
            <HiShoppingCart size={16} color="orange" />
          ) : (
            <HiOutlineShoppingCart size={16} />
          )}
        </div>
        <div className="star" onClick={() => handleWish(id)}>
          {isInWishlist ? (
            <RiHeartFill size={18} color="red" />
          ) : (
            <RiHeart2Line size={18} />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {!isCollection && (
        <ToastContainer
          autoClose={1000}
        />
      )}
    </div>
  );
};

export default ArrivalCard;