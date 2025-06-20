// src/api/auth.js
import axios from '../utils/axios';

export const signup = async ({ fullName, email, password }) => {
  const res = await axios.post('/user/signup', { fullName, email, password });
  return res.data;
};

export const signin = async ({ email, password }) => {
  const res = await axios.post('/user/signin', { email, password });
  return res.data;
};

export const getProfile = async () => {
  const res = await axios.get('/user/profile');
  return res.data;
};

export const logout = async () => {
  const res = await axios.post('/user/logout');
  return res.data;
};
