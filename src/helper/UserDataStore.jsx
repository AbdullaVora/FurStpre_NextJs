'use client';

import { setUserData } from '@/redux/slice/userDataSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function UserDataStore({children}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    if (userId && userName && userEmail && token) {
      dispatch(setUserData({
        userId,
        userName,
        userEmail,
        token,
      }));
    }
  }, []);

  return children; // no UI needed
}
