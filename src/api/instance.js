import axios from 'axios';

const apiInstance = axios.create({
    // baseURL: 'https://furstore-api.onrender.com',
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default apiInstance;