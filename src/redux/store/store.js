import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../slice/HomeSlice";
import CollectionSlice from "../slice/CollectionSlice"; 
import BlogSlice from "../slice/BlogSlice"; 

export const store = configureStore({
    reducer: {
        Home: HomeSlice,
        Collection: CollectionSlice, 
        Blog: BlogSlice
    }
});
