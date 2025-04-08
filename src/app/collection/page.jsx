// "use client";

// import React, { useEffect, useState } from 'react';
// import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import ArrivalCard from '@/components/ArrivalCard';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useRouter } from 'next/navigation';
// import { fetchProducts } from '@/redux/slice/CollectionSlice';


// const categories = useSelector((state) => state.Collection.categories)
// const brands = useSelector((state) => state.Collection.categories)

// // Dummy filter data structure
// const dummyFilterData = {
//     categories: [
//         {
//             id: 1,
//             name: "Furniture",
//             subcategories: [
//                 { id: 101, name: "Sofas" },
//                 { id: 102, name: "Chairs" },
//                 { id: 103, name: "Tables" },
//                 { id: 104, name: "Beds" },
//                 { id: 105, name: "Dining" },
//                 { id: 106, name: "Entertainment" }
//             ]
//         },
//         {
//             id: 2,
//             name: "Storage",
//             subcategories: [
//                 { id: 201, name: "Wardrobes" },
//                 { id: 202, name: "Shelves" },
//                 { id: 203, name: "Cabinets" },
//                 { id: 204, name: "Drawers" }
//             ]
//         },
//         {
//             id: 3,
//             name: "Decor",
//             subcategories: [
//                 { id: 301, name: "Lighting" },
//                 { id: 302, name: "Mirrors" },
//                 { id: 303, name: "Rugs" },
//                 { id: 304, name: "Wall Art" }
//             ]
//         }
//     ],
//     brands: [
//         { id: 1, name: "UrbanLiving" },
//         { id: 2, name: "NatureWood" },
//         { id: 3, name: "ComfortPlus" },
//         { id: 4, name: "SpaceWise" },
//         { id: 5, name: "LuxuryHome" },
//         { id: 6, name: "MinimalDecor" }
//     ]
// };

// const Collections = () => {
//     const data = useSelector((state) => state.Collection.products);
//     const [collection, setCollection] = useState(true);
//     const [product, setProductData] = useState([]);
//     const [wishProduct, setwishProductData] = useState([]);

//     const router = useRouter()

//     // Filter states
//     const [showFilters, setShowFilters] = useState(false);
//     const [priceRange, setPriceRange] = useState([0, 10000]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [sortBy, setSortBy] = useState('');
//     const [appliedFilters, setAppliedFilters] = useState([]);
//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(10000);

//     // Dropdown states
//     const [openCategory, setOpenCategory] = useState(null);
//     const [openBrand, setOpenBrand] = useState(false);
//     const dispatch = useDispatch()

//     // Update the product state whenever data changes
//     // In your useEffect where you initialize the price range:
//     useEffect(() => {
//         dispatch(fetchProducts())
//     }, [dispatch])

//     console.log(data)

//     useEffect(() => {
//         if (data) {
//             setProductData(data);
//             // Calculate min and max prices from actual products
//             const prices = data.map(p => p.price).filter(price => !isNaN(price));
//             if (prices.length > 0) {
//                 setMinPrice(Math.min(...prices));
//                 setMaxPrice(Math.max(...prices));
//                 setPriceRange([minPrice, maxPrice]);

//                 // Set these values as defaults in your slider
//                 // You'll need to update your Slider component to use these dynamic values
//             }
//         }
//     }, [data]);
//     // Apply filters whenever any filter changes
//     useEffect(() => {
//         let filteredProducts = data.filter(product => product.status === true) || [];

//         // Apply category filter
//         if (selectedCategories.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedCategories.includes(product.category)
//             );
//         }

//         // Apply subcategory filter
//         if (selectedSubcategories.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedSubcategories.includes(product.subcategory)
//             );
//         }

//         // Apply brand filter
//         if (selectedBrands.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedBrands.includes(product.brand)
//             );
//         }

//         // Apply price range filter
//         filteredProducts = filteredProducts.filter(product =>
//             product.price >= priceRange[0] && product.price <= priceRange[1]
//         );

//         // Apply sorting
//         if (sortBy === 'a-z') {
//             filteredProducts.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
//         } else if (sortBy === 'z-a') {
//             filteredProducts.sort((a, b) => (a.name && b.name ? b.titlname.localeCompare(a.name) : 0));
//         } else if (sortBy === 'price-low') {
//             filteredProducts.sort((a, b) => (a.price && b.price ? a.price - b.price : 0));
//         } else if (sortBy === 'price-high') {
//             filteredProducts.sort((a, b) => (a.price && b.price ? b.price - a.price : 0));
//         } else if (sortBy === 'newest') {
//             filteredProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
//         } else if (sortBy === 'oldest') {
//             filteredProducts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
//         }

//         setProductData(filteredProducts);

//         // Update applied filters
//         const filters = [];
//         if (selectedCategories.length > 0) {
//             filters.push(`Categories: ${selectedCategories.join(', ')}`);
//         }
//         if (selectedSubcategories.length > 0) {
//             filters.push(`Subcategories: ${selectedSubcategories.join(', ')}`);
//         }
//         if (selectedBrands.length > 0) {
//             filters.push(`Brands: ${selectedBrands.join(', ')}`);
//         }
//         if (priceRange[0] !== 0 || priceRange[1] !== 10000) {
//             filters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
//         }
//         if (sortBy) {
//             filters.push(`Sort: ${getSortLabel(sortBy)}`);
//         }
//         setAppliedFilters(filters);
//     }, [selectedCategories, selectedSubcategories, selectedBrands, priceRange, sortBy, data]);

//     const getSortLabel = (value) => {
//         switch (value) {
//             case 'a-z': return 'A-Z';
//             case 'z-a': return 'Z-A';
//             case 'price-low': return 'Price: Low to High';
//             case 'price-high': return 'Price: High to Low';
//             case 'newest': return 'Newest First';
//             case 'oldest': return 'Oldest First';
//             default: return '';
//         }
//     };

//     const toggleCategory = (category) => {
//         if (selectedCategories.includes(category)) {
//             setSelectedCategories(selectedCategories.filter(c => c !== category));
//             // Remove subcategories of this category when category is deselected
//             const categoryData = dummyFilterData.categories.find(c => c.name === category);
//             if (categoryData) {
//                 const subcatsToRemove = categoryData.subcategories.map(sc => sc.name);
//                 setSelectedSubcategories(selectedSubcategories.filter(sc => !subcatsToRemove.includes(sc)));
//             }
//         } else {
//             setSelectedCategories([...selectedCategories, category]);
//         }
//         setOpenCategory(openCategory === category ? null : category);
//     };

//     const toggleSubcategory = (subcategory) => {
//         if (selectedSubcategories.includes(subcategory)) {
//             setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcategory));
//         } else {
//             setSelectedSubcategories([...selectedSubcategories, subcategory]);
//         }
//     };

//     const toggleBrand = (brand) => {
//         if (selectedBrands.includes(brand)) {
//             setSelectedBrands(selectedBrands.filter(b => b !== brand));
//         } else {
//             setSelectedBrands([...selectedBrands, brand]);
//         }
//     };

//     const clearAllFilters = () => {
//         setSelectedCategories([]);
//         setSelectedSubcategories([]);
//         setSelectedBrands([]);
//         const prices = data?.product?.map(p => p.price).filter(price => !isNaN(price)) || [0, 10000];
//         if (prices.length > 0) {
//             const minPrice = Math.min(...prices);
//             const maxPrice = Math.max(...prices);
//             setPriceRange([minPrice, maxPrice]);
//         }
//         setSortBy('');
//     };

//     const removeFilter = (index) => {
//         const filterText = appliedFilters[index];

//         if (filterText.startsWith('Categories:')) {
//             setSelectedCategories([]);
//             // Also remove any subcategories from these categories
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Subcategories:')) {
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Brands:')) {
//             setSelectedBrands([]);
//         } else if (filterText.startsWith('Price:')) {
//             const prices = data?.product?.map(p => p.price).filter(price => !isNaN(price)) || [0, 10000];
//             if (prices.length > 0) {
//                 const minPrice = Math.min(...prices);
//                 const maxPrice = Math.max(...prices);
//                 setPriceRange([minPrice, maxPrice]);
//             }
//         } else if (filterText.startsWith('Sort:')) {
//             setSortBy('');
//         }
//     };


//     return (
//         <>
//             <Header />
//             {/* ****************************** Banner Start ***************************** */}
//             <div className="collection d-flex align-items-center justify-content-center">
//                 <div className="title text-center">
//                     <h1>FurStore Collections</h1>
//                     <span className='d-block'>Style your space, live in comfort. Furniture that feels like home</span>
//                 </div>
//             </div>
//             {/* ****************************** Banner End ***************************** */}

//             {/* ****************************** Main Content Start ***************************** */}
//             <div className="container my-5">
//                 <div className="row">
//                     {/* ****************************** Filters Sidebar ***************************** */}
//                     <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
//                         <div className="card shadow-sm">
//                             <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                                 <h5 className="mb-0">Filters</h5>
//                                 <button
//                                     className="btn btn-sm btn-outline-secondary d-lg-none"
//                                     onClick={() => setShowFilters(false)}
//                                 >
//                                     ×
//                                 </button>
//                             </div>
//                             <div className="card-body">
//                                 {/* Price Range Filter */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Price Range</span>
//                                     </h6>
//                                     <div className="px-2">
//                                         <Slider
//                                             range
//                                             min={Math.floor(minPrice)} // Use actual minimum price
//                                             max={Math.ceil(maxPrice)}  // Use actual maximum price
//                                             value={priceRange}
//                                             onChange={setPriceRange}
//                                             step={100} // Or whatever increment makes sense
//                                             marks={{
//                                                 // [minPrice]: `₹${minPrice}`,
//                                                 // [maxPrice / 2]: `₹${Math.round(maxPrice / 2)}`,
//                                                 // [maxPrice]: `₹${maxPrice}`
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="d-flex justify-content-between mt-2">
//                                         <span>₹{priceRange[0]}</span>
//                                         <span>₹{priceRange[1]}</span>
//                                     </div>
//                                 </div>

//                                 {/* Categories Filter with Dropdown */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Categories</span>
//                                     </h6>
//                                     <div className="filter-group">
//                                         {dummyFilterData.categories.map(category => (
//                                             <div key={category.id} className="mb-2">
//                                                 <div
//                                                     className="d-flex justify-content-between align-items-center filter-header"
//                                                     onClick={() => toggleCategory(category.name)}
//                                                 >
//                                                     <div className="form-check">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id={`cat-${category.id}`}
//                                                             checked={selectedCategories.includes(category.name)}
//                                                             onChange={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleCategory(category.name);
//                                                             }}
//                                                         />
//                                                         <label className="form-check-label" htmlFor={`cat-${category.id}`}>
//                                                             {category.name}
//                                                         </label>
//                                                     </div>
//                                                     {openCategory === category.name ? <FaAngleUp /> : <FaAngleDown />}
//                                                 </div>
//                                                 {openCategory === category.name && (
//                                                     <div className="subcategories ps-4 mt-2">
//                                                         {category.subcategories.map(subcategory => (
//                                                             <div key={subcategory.id} className="form-check mb-1">
//                                                                 <input
//                                                                     className="form-check-input"
//                                                                     type="checkbox"
//                                                                     id={`subcat-${subcategory.id}`}
//                                                                     checked={selectedSubcategories.includes(subcategory.name)}
//                                                                     onChange={() => toggleSubcategory(subcategory.name)}
//                                                                     disabled={!selectedCategories.includes(category.name)}
//                                                                 />
//                                                                 <label className="form-check-label" htmlFor={`subcat-${subcategory.id}`}>
//                                                                     {subcategory.name}
//                                                                 </label>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Brands Filter with Dropdown */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Brands</span>
//                                         <span onClick={() => setOpenBrand(!openBrand)}>
//                                             {openBrand ? <FaAngleUp /> : <FaAngleDown />}
//                                         </span>
//                                     </h6>
//                                     {openBrand && (
//                                         <div className="form-group">
//                                             {dummyFilterData.brands.map(brand => (
//                                                 <div key={brand.id} className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id={`brand-${brand.id}`}
//                                                         checked={selectedBrands.includes(brand.name)}
//                                                         onChange={() => toggleBrand(brand.name)}
//                                                     />
//                                                     <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
//                                                         {brand.name}
//                                                     </label>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Sort By */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Sort By</span>
//                                     </h6>
//                                     <select
//                                         className="form-select"
//                                         value={sortBy}
//                                         onChange={(e) => setSortBy(e.target.value)}
//                                     >
//                                         <option value="">Recommended</option>
//                                         <option value="a-z">Alphabetically: A-Z</option>
//                                         <option value="z-a">Alphabetically: Z-A</option>
//                                         <option value="price-low">Price: Low to High</option>
//                                         <option value="price-high">Price: High to Low</option>
//                                         <option value="newest">Newest First</option>
//                                         <option value="oldest">Oldest First</option>
//                                     </select>
//                                 </div>

//                                 {/* Clear All Button */}
//                                 <button
//                                     className="btn btn-outline-danger w-100"
//                                     onClick={clearAllFilters}
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ****************************** Products Section ***************************** */}
//                     <div className="col-lg-9">
//                         {/* Filter Toggle Button (Mobile) */}
//                         <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
//                             <button
//                                 className="btn btn-outline-primary"
//                                 onClick={() => setShowFilters(!showFilters)}
//                             >
//                                 <HiMiniAdjustmentsHorizontal className="me-2" />
//                                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                             </button>
//                             <div className="text-muted">
//                                 {product.length} Products
//                             </div>
//                         </div>

//                         {/* Applied Filters */}
//                         {appliedFilters.length > 0 && (
//                             <div className="mb-4">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <span className="me-2 fw-bold">Applied Filters:</span>
//                                     {appliedFilters.map((filter, index) => (
//                                         <div key={index} className="badge bg-light text-dark me-2 mb-2 d-flex align-items-center">
//                                             {filter}
//                                             <button
//                                                 className="btn btn-sm p-0 ms-2"
//                                                 onClick={() => removeFilter(index)}
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Products Grid */}
//                         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                             {product.map((card) => (
//                                 <div key={card.id} className="col">
//                                     <ArrivalCard
//                                         img={card.thumbnail}
//                                         id={card._id}
//                                         title={card.name}
//                                         price={card.price}
//                                         isCollection={collection}
//                                     />
//                                 </div>
//                             ))}
//                         </div>

//                         {/* No Results Message */}
//                         {product.length === 0 && (
//                             <div className="text-center py-5">
//                                 <h4>No products match your filters</h4>
//                                 <button
//                                     className="btn btn-primary mt-3"
//                                     onClick={clearAllFilters}
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {/* ****************************** Main Content End ***************************** */}

//             <Footer />
//         </>
//     );
// };

// export default Collections;

// "use client";

// import React, { useEffect, useState } from 'react';
// import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import ArrivalCard from '@/components/ArrivalCard';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useRouter } from 'next/navigation';
// import { fetchBrands, fetchCategories, fetchProducts } from '@/redux/slice/CollectionSlice';

// const Collections = () => {
//     // Get data from Redux store
//     const data = useSelector((state) => state.Collection.products);
//     const categories = useSelector((state) => state.Collection.categories);
//     const brands = useSelector((state) => state.Collection.brands);

//     const [collection, setCollection] = useState(true);
//     const [product, setProductData] = useState([]);
//     const [wishProduct, setwishProductData] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);

//     const router = useRouter();
//     const dispatch = useDispatch();

//     // Filter states
//     const [showFilters, setShowFilters] = useState(false);
//     const [priceRange, setPriceRange] = useState([0, 10000]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [sortBy, setSortBy] = useState('');
//     const [appliedFilters, setAppliedFilters] = useState([]);
//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(10000);

//     // Dropdown states
//     const [openCategory, setOpenCategory] = useState(null);
//     const [openBrand, setOpenBrand] = useState(false);

//     // Fetch products on component mount
//     useEffect(() => {
//         dispatch(fetchProducts());
//         dispatch(fetchCategories());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//     // Set initial product data and price range
//     useEffect(() => {
//         if (data && data.length > 0) {
//             // Filter products with status true
//             const activeProducts = data.filter(product => product.status === true);
//             setProductData(activeProducts);

//             // Calculate min and max prices from actual products
//             const prices = activeProducts.map(p => p.price).filter(price => !isNaN(price));
//             if (prices.length > 0) {
//                 const min = Math.min(...prices);
//                 const max = Math.max(...prices);
//                 setMinPrice(min);
//                 setMaxPrice(max);
//                 setPriceRange([min, max]);
//             }
//         }
//     }, [data]);

//     // Update subcategories when categories or selected categories change
//     useEffect(() => {
//         if (categories && categories.length > 0) {
//             // Get subcategories for selected categories
//             const filteredSubcategories = [];

//             selectedCategories.forEach(selectedCategory => {
//                 // Find the category object that matches the selected category name
//                 const categoryObj = categories.find(cat => cat.parent === selectedCategory);

//                 // If found and has subcategories, add them to our filtered list
//                 if (categoryObj) {
//                     filteredSubcategories.push(categoryObj);
//                 }
//             });

//             setSubcategories(filteredSubcategories);

//             // If a category is deselected, remove its subcategories from selected subcategories
//             const validSubcategoryNames = filteredSubcategories.map(sub => sub.name);
//             setSelectedSubcategories(prev =>
//                 prev.filter(subName => validSubcategoryNames.includes(subName))
//             );
//         }
//     }, [categories, selectedCategories]);

//     // Apply filters whenever any filter changes
//     useEffect(() => {
//         if (!data) return;

//         let filteredProducts = data.filter(product => product.status === true);

//         // Apply category filter
//         if (selectedCategories.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedCategories.includes(product.category)
//             );
//         }

//         // Apply subcategory filter
//         if (selectedSubcategories.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedSubcategories.includes(product.subcategory)
//             );
//         }

//         // Apply brand filter
//         if (selectedBrands.length > 0) {
//             filteredProducts = filteredProducts.filter(product =>
//                 selectedBrands.includes(product.brand)
//             );
//         }

//         // Apply price range filter
//         filteredProducts = filteredProducts.filter(product =>
//             product.price >= priceRange[0] && product.price <= priceRange[1]
//         );

//         // Apply sorting
//         if (sortBy === 'a-z') {
//             filteredProducts.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
//         } else if (sortBy === 'z-a') {
//             filteredProducts.sort((a, b) => (a.name && b.name ? b.name.localeCompare(a.name) : 0));
//         } else if (sortBy === 'price-low') {
//             filteredProducts.sort((a, b) => (a.price && b.price ? a.price - b.price : 0));
//         } else if (sortBy === 'price-high') {
//             filteredProducts.sort((a, b) => (a.price && b.price ? b.price - a.price : 0));
//         } else if (sortBy === 'newest') {
//             filteredProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
//         } else if (sortBy === 'oldest') {
//             filteredProducts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
//         }

//         setProductData(filteredProducts);

//         // Update applied filters
//         const filters = [];
//         if (selectedCategories.length > 0) {
//             filters.push(`Categories: ${selectedCategories.join(', ')}`);
//         }
//         if (selectedSubcategories.length > 0) {
//             filters.push(`Subcategories: ${selectedSubcategories.join(', ')}`);
//         }
//         if (selectedBrands.length > 0) {
//             filters.push(`Brands: ${selectedBrands.join(', ')}`);
//         }
//         if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
//             filters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
//         }
//         if (sortBy) {
//             filters.push(`Sort: ${getSortLabel(sortBy)}`);
//         }
//         setAppliedFilters(filters);
//     }, [selectedCategories, selectedSubcategories, selectedBrands, priceRange, sortBy, data, minPrice, maxPrice]);

//     const getSortLabel = (value) => {
//         switch (value) {
//             case 'a-z': return 'A-Z';
//             case 'z-a': return 'Z-A';
//             case 'price-low': return 'Price: Low to High';
//             case 'price-high': return 'Price: High to Low';
//             case 'newest': return 'Newest First';
//             case 'oldest': return 'Oldest First';
//             default: return '';
//         }
//     };

//     const toggleCategory = (category) => {
//         if (selectedCategories.includes(category)) {
//             setSelectedCategories(selectedCategories.filter(c => c !== category));
//         } else {
//             setSelectedCategories([...selectedCategories, category]);
//         }
//         setOpenCategory(openCategory === category ? null : category);
//     };

//     const toggleSubcategory = (subcategory) => {
//         if (selectedSubcategories.includes(subcategory)) {
//             setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcategory));
//         } else {
//             setSelectedSubcategories([...selectedSubcategories, subcategory]);
//         }
//     };

//     const toggleBrand = (brand) => {
//         if (selectedBrands.includes(brand)) {
//             setSelectedBrands(selectedBrands.filter(b => b !== brand));
//         } else {
//             setSelectedBrands([...selectedBrands, brand]);
//         }
//     };

//     const clearAllFilters = () => {
//         setSelectedCategories([]);
//         setSelectedSubcategories([]);
//         setSelectedBrands([]);
//         setPriceRange([minPrice, maxPrice]);
//         setSortBy('');
//     };

//     const removeFilter = (index) => {
//         const filterText = appliedFilters[index];

//         if (filterText.startsWith('Categories:')) {
//             setSelectedCategories([]);
//             // Also remove any subcategories since they depend on categories
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Subcategories:')) {
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Brands:')) {
//             setSelectedBrands([]);
//         } else if (filterText.startsWith('Price:')) {
//             setPriceRange([minPrice, maxPrice]);
//         } else if (filterText.startsWith('Sort:')) {
//             setSortBy('');
//         }
//     };

//     return (
//         <>
//             <Header />
//             {/* ****************************** Banner Start ***************************** */}
//             <div className="collection d-flex align-items-center justify-content-center">
//                 <div className="title text-center">
//                     <h1>FurStore Collections</h1>
//                     <span className='d-block'>Style your space, live in comfort. Furniture that feels like home</span>
//                 </div>
//             </div>
//             {/* ****************************** Banner End ***************************** */}

//             {/* ****************************** Main Content Start ***************************** */}
//             <div className="container my-5">
//                 <div className="row">
//                     {/* ****************************** Filters Sidebar ***************************** */}
//                     <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
//                         <div className="card shadow-sm">
//                             <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                                 <h5 className="mb-0">Filters</h5>
//                                 <button
//                                     className="btn btn-sm btn-outline-secondary d-lg-none"
//                                     onClick={() => setShowFilters(false)}
//                                 >
//                                     ×
//                                 </button>
//                             </div>
//                             <div className="card-body">
//                                 {/* Price Range Filter */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Price Range</span>
//                                     </h6>
//                                     <div className="px-2">
//                                         <Slider
//                                             range
//                                             min={Math.floor(minPrice)}
//                                             max={Math.ceil(maxPrice)}
//                                             value={priceRange}
//                                             onChange={setPriceRange}
//                                             step={100}
//                                         />
//                                     </div>
//                                     <div className="d-flex justify-content-between mt-2">
//                                         <span>₹{priceRange[0]}</span>
//                                         <span>₹{priceRange[1]}</span>
//                                     </div>
//                                 </div>

//                                 {/* Categories Filter with Dropdown */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Categories</span>
//                                     </h6>
//                                     <div className="filter-group">
//                                         {categories && categories.length > 0 ? (
//                                             categories.map(category => (
//                                                 <div key={category.id} className="mb-2">
//                                                     <div
//                                                         className="d-flex justify-content-between align-items-center filter-header"
//                                                         onClick={() => toggleCategory(category.name)}
//                                                     >
//                                                         <div className="form-check">
//                                                             <input
//                                                                 className="form-check-input"
//                                                                 type="checkbox"
//                                                                 id={`cat-${category.id}`}
//                                                                 checked={selectedCategories.includes(category.name)}
//                                                                 onChange={(e) => {
//                                                                     e.stopPropagation();
//                                                                     toggleCategory(category.name);
//                                                                 }}
//                                                             />
//                                                             <label className="form-check-label" htmlFor={`cat-${category.id}`}>
//                                                                 {category.name}
//                                                             </label>
//                                                         </div>
//                                                         {openCategory === category.name ? <FaAngleUp /> : <FaAngleDown />}
//                                                     </div>
//                                                     {openCategory === category.name && category.subcategories && (
//                                                         <div className="subcategories ps-4 mt-2">
//                                                             {category.subcategories.map(subcategory => (
//                                                                 <div key={subcategory.id} className="form-check mb-1">
//                                                                     <input
//                                                                         className="form-check-input"
//                                                                         type="checkbox"
//                                                                         id={`subcat-${subcategory.id}`}
//                                                                         checked={selectedSubcategories.includes(subcategory.name)}
//                                                                         onChange={() => toggleSubcategory(subcategory.name)}
//                                                                     />
//                                                                     <label className="form-check-label" htmlFor={`subcat-${subcategory.id}`}>
//                                                                         {subcategory.name}
//                                                                     </label>
//                                                                 </div>
//                                                             ))}
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             ))
//                                         ) : (
//                                             <div>Loading categories...</div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Brands Filter with Dropdown */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Brands</span>
//                                         <span onClick={() => setOpenBrand(!openBrand)}>
//                                             {openBrand ? <FaAngleUp /> : <FaAngleDown />}
//                                         </span>
//                                     </h6>
//                                     {openBrand && (
//                                         <div className="form-group">
//                                             {brands && brands.length > 0 ? (
//                                                 brands.map(brand => (
//                                                     <div key={brand.id} className="form-check">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id={`brand-${brand.id}`}
//                                                             checked={selectedBrands.includes(brand.name)}
//                                                             onChange={() => toggleBrand(brand.name)}
//                                                         />
//                                                         <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
//                                                             {brand.name}
//                                                         </label>
//                                                     </div>
//                                                 ))
//                                             ) : (
//                                                 <div>Loading brands...</div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Sort By */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Sort By</span>
//                                     </h6>
//                                     <select
//                                         className="form-select"
//                                         value={sortBy}
//                                         onChange={(e) => setSortBy(e.target.value)}
//                                     >
//                                         <option value="">Recommended</option>
//                                         <option value="a-z">Alphabetically: A-Z</option>
//                                         <option value="z-a">Alphabetically: Z-A</option>
//                                         <option value="price-low">Price: Low to High</option>
//                                         <option value="price-high">Price: High to Low</option>
//                                         <option value="newest">Newest First</option>
//                                         <option value="oldest">Oldest First</option>
//                                     </select>
//                                 </div>

//                                 {/* Clear All Button */}
//                                 <button
//                                     className="btn btn-outline-danger w-100"
//                                     onClick={clearAllFilters}
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ****************************** Products Section ***************************** */}
//                     <div className="col-lg-9">
//                         {/* Filter Toggle Button (Mobile) */}
//                         <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
//                             <button
//                                 className="btn btn-outline-primary"
//                                 onClick={() => setShowFilters(!showFilters)}
//                             >
//                                 <HiMiniAdjustmentsHorizontal className="me-2" />
//                                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                             </button>
//                             <div className="text-muted">
//                                 {product.length} Products
//                             </div>
//                         </div>

//                         {/* Applied Filters */}
//                         {appliedFilters.length > 0 && (
//                             <div className="mb-4">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <span className="me-2 fw-bold">Applied Filters:</span>
//                                     {appliedFilters.map((filter, index) => (
//                                         <div key={index} className="badge bg-light text-dark me-2 mb-2 d-flex align-items-center">
//                                             {filter}
//                                             <button
//                                                 className="btn btn-sm p-0 ms-2"
//                                                 onClick={() => removeFilter(index)}
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Products Grid */}
//                         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                             {product.length > 0 ? (
//                                 product.map((card) => (
//                                     <div key={card._id} className="col">
//                                         <ArrivalCard
//                                             img={card.thumbnail}
//                                             id={card._id}
//                                             title={card.name}
//                                             price={card.price}
//                                             isCollection={collection}
//                                         />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="col-12 text-center py-5">
//                                     <h4>No products match your filters</h4>
//                                     <button
//                                         className="btn btn-primary mt-3"
//                                         onClick={clearAllFilters}
//                                     >
//                                         Clear All Filters
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* ****************************** Main Content End ***************************** */}

//             <Footer />
//         </>
//     );
// };

// export default Collections;




"use client";

import React, { useEffect, useState } from 'react';
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import ArrivalCard from '@/components/ArrivalCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { fetchBrands, fetchCategories, fetchProducts } from '@/redux/slice/CollectionSlice';

const Collections = () => {
    // Get data from Redux store
    const { products, loading: Loading } = useSelector((state) => state.Collection);
    const { categories, loading: CatLoading } = useSelector((state) => state.Collection);
    const { brands, loading: brdLoading } = useSelector((state) => state.Collection);

    const data = products;


    const [collection, setCollection] = useState(true);
    const [product, setProductData] = useState([]);
    const [wishProduct, setwishProductData] = useState([]);

    const router = useRouter();
    const dispatch = useDispatch();

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    // Dropdown states
    const [dropdownOpen, setDropdownOpen] = useState({
        categories: true,
        subcategories: true,
        brands: true
    });

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    // Set initial product data and price range
    useEffect(() => {
        if (data && data.length > 0) {
            const activeProducts = data.filter(product => product.status === true);
            setProductData(activeProducts);

            const prices = activeProducts.map(p => p.price).filter(price => !isNaN(price));
            if (prices.length > 0) {
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                setMinPrice(min);
                setMaxPrice(max);
                setPriceRange([min, max]);
            }
        }
    }, [data]);

    // Apply filters whenever any filter changes
    useEffect(() => {
        if (!data) return;

        let filteredProducts = data.filter(product => product.status === true);

        console.log(filteredProducts)
        // Apply category filter
        if (selectedCategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedCategories.includes(product.category.name)
            );
        }

        // Apply subcategory filter
        if (selectedSubcategories.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedSubcategories.includes(product.subcategory.name)
            );
        }

        // Apply brand filter
        if (selectedBrands.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedBrands.includes(product.brand.name)
            );
        }

        // Apply price range filter
        filteredProducts = filteredProducts.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        if (sortBy === 'a-z') {
            filteredProducts.sort((a, b) => (a.name && b.name ? a.name.localeCompare(b.name) : 0));
        } else if (sortBy === 'z-a') {
            filteredProducts.sort((a, b) => (a.name && b.name ? b.name.localeCompare(a.name) : 0));
        } else if (sortBy === 'price-low') {
            filteredProducts.sort((a, b) => (a.price && b.price ? a.price - b.price : 0));
        } else if (sortBy === 'price-high') {
            filteredProducts.sort((a, b) => (a.price && b.price ? b.price - a.price : 0));
        } else if (sortBy === 'newest') {
            filteredProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        } else if (sortBy === 'oldest') {
            filteredProducts.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        }

        setProductData(filteredProducts);

        // Update applied filters
        const filters = [];
        if (selectedCategories.length > 0) {
            filters.push(`Categories: ${selectedCategories.join(', ')}`);
        }
        if (selectedSubcategories.length > 0) {
            filters.push(`Subcategories: ${selectedSubcategories.join(', ')}`);
        }
        if (selectedBrands.length > 0) {
            filters.push(`Brands: ${selectedBrands.join(', ')}`);
        }
        if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
            filters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
        }
        if (sortBy) {
            filters.push(`Sort: ${getSortLabel(sortBy)}`);
        }
        setAppliedFilters(filters);
    }, [selectedCategories, selectedSubcategories, selectedBrands, priceRange, sortBy, data, minPrice, maxPrice]);

    const getSortLabel = (value) => {
        switch (value) {
            case 'a-z': return 'A-Z';
            case 'z-a': return 'Z-A';
            case 'price-low': return 'Price: Low to High';
            case 'price-high': return 'Price: High to Low';
            case 'newest': return 'Newest First';
            case 'oldest': return 'Oldest First';
            default: return '';
        }
    };

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
            // Remove subcategories when parent category is deselected
            const subcatsToRemove = categories
                .filter(cat => cat.parent === category)
                .map(cat => cat.name);
            setSelectedSubcategories(prev =>
                prev.filter(sc => !subcatsToRemove.includes(sc))
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const toggleSubcategory = (subcategory) => {
        if (selectedSubcategories.includes(subcategory)) {
            setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    };

    const toggleBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const toggleDropdown = (dropdown) => {
        setDropdownOpen(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedSubcategories([]);
        setSelectedBrands([]);
        setPriceRange([minPrice, maxPrice]);
        setSortBy('');
    };

    const removeFilter = (index) => {
        const filterText = appliedFilters[index];

        if (filterText.startsWith('Categories:')) {
            setSelectedCategories([]);
            setSelectedSubcategories([]);
        } else if (filterText.startsWith('Subcategories:')) {
            setSelectedSubcategories([]);
        } else if (filterText.startsWith('Brands:')) {
            setSelectedBrands([]);
        } else if (filterText.startsWith('Price:')) {
            setPriceRange([minPrice, maxPrice]);
        } else if (filterText.startsWith('Sort:')) {
            setSortBy('');
        }
    };

    // Get parent categories (categories without parents)
    const parentCategories = categories?.filter(cat => cat.parent == 'N/A') || [];

    // Get subcategories for selected categories
    const availableSubcategories = categories?.filter(cat =>
        cat.parent && selectedCategories.includes(cat.parent)
    ) || [];

    if (Loading && CatLoading && brdLoading) {
        return (
            <div className='loader-container'>
                <span class="loader"></span>
            </div>
        );
    }

    return (
        <>
            <Header />
            {/* Banner Section */}
            <div className="collection d-flex align-items-center justify-content-center">
                <div className="title text-center">
                    <h1>FurStore Collections</h1>
                    <span className='d-block'>Style your space, live in comfort. Furniture that feels like home</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                <div className="row">
                    {/* Filters Sidebar */}
                    <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                        <div className="card shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Filters</h5>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-lg-none"
                                    onClick={() => setShowFilters(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="card-body">
                                {/* Price Range Filter */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Price Range</span>
                                    </h6>
                                    <div className="px-2">
                                        <Slider
                                            range
                                            min={Math.floor(minPrice)}
                                            max={Math.ceil(maxPrice)}
                                            value={priceRange}
                                            onChange={setPriceRange}
                                            step={100}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>

                                {/* Categories Filter */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Categories</span>
                                        <span onClick={() => toggleDropdown('categories')}>
                                            {dropdownOpen.categories ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    </h6>
                                    {dropdownOpen.categories && (
                                        <div className="filter-group">
                                            {parentCategories.length > 0 ? (
                                                parentCategories.map(category => (
                                                    <div key={category.id} className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`cat-${category.id}`}
                                                            checked={selectedCategories.includes(category.name)}
                                                            onChange={() => toggleCategory(category.name)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`cat-${category.id}`}>
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Loading categories...</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Subcategories Filter - only show if categories are selected */}
                                {selectedCategories.length > 0 && (
                                    <div className="mb-4">
                                        <h6 className="d-flex justify-content-between align-items-center">
                                            <span>Subcategories</span>
                                            <span onClick={() => toggleDropdown('subcategories')}>
                                                {dropdownOpen.subcategories ? <FaAngleUp /> : <FaAngleDown />}
                                            </span>
                                        </h6>
                                        {dropdownOpen.subcategories && (
                                            <div className="filter-group">
                                                {availableSubcategories.length > 0 ? (
                                                    availableSubcategories.map(subcategory => (
                                                        <div key={subcategory.id} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`subcat-${subcategory.id}`}
                                                                checked={selectedSubcategories.includes(subcategory.name)}
                                                                onChange={() => toggleSubcategory(subcategory.name)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`subcat-${subcategory.id}`}>
                                                                {subcategory.name}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No subcategories available</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Brands Filter */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Brands</span>
                                        <span onClick={() => toggleDropdown('brands')}>
                                            {dropdownOpen.brands ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    </h6>
                                    {dropdownOpen.brands && (
                                        <div className="filter-group">
                                            {brands && brands.length > 0 ? (
                                                brands.map(brand => (
                                                    <div key={brand.id} className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`brand-${brand.id}`}
                                                            checked={selectedBrands.includes(brand.name)}
                                                            onChange={() => toggleBrand(brand.name)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                                                            {brand.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Loading brands...</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Sort By */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Sort By</span>
                                    </h6>
                                    <select
                                        className="form-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="">Recommended</option>
                                        <option value="a-z">Alphabetically: A-Z</option>
                                        <option value="z-a">Alphabetically: Z-A</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                    </select>
                                </div>

                                {/* Clear All Button */}
                                <button
                                    className="btn btn-outline-danger w-100"
                                    onClick={clearAllFilters}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-lg-9">
                        {/* Filter Toggle Button (Mobile) */}
                        <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <HiMiniAdjustmentsHorizontal className="me-2" />
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </button>
                            <div className="text-muted">
                                {product.length} Products
                            </div>
                        </div>

                        {/* Applied Filters */}
                        {appliedFilters.length > 0 && (
                            <div className="mb-4">
                                <div className="d-flex flex-wrap align-items-center">
                                    <span className="me-2 fw-bold">Applied Filters:</span>
                                    {appliedFilters.map((filter, index) => (
                                        <div key={index} className="badge bg-light text-dark me-2 mb-2 d-flex align-items-center">
                                            {filter}
                                            <button
                                                className="btn btn-sm p-0 ms-2"
                                                onClick={() => removeFilter(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {product.length > 0 ? (
                                product.map((card) => (
                                    <div key={card._id} className="col">
                                        <ArrivalCard
                                            img={card.thumbnail}
                                            id={card._id}
                                            title={card.name}
                                            price={card.price}
                                            isCollection={collection}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <h4>No products match your filters</h4>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={clearAllFilters}
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Collections;