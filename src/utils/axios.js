import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blogify-bice-rho.vercel.app/api',
  withCredentials: true,
});

export default instance;
