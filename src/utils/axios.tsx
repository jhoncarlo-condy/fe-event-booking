// lib/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = () => {
    return Cookies.get('token');
}

export const AxiosInstance = axios.create({    
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // Replace with your API URL
  headers: {
    'Authorization': `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});
