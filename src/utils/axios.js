import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://blogify-woad-three.vercel.app/api' 
    : 'http://localhost:8002/api',
  withCredentials: true,
});

export default instance;
