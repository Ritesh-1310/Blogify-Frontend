import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://blogify-bice-rho.vercel.app/api' 
    : 'http://localhost:8002/api',
  withCredentials: true,
});

export default instance;
