// src/api/blog.js
import axios from '../utils/axios';

export const getAllBlogs = async () => {
  const res = await axios.get('/blog');
  return res.data;
};

export const getBlogById = async (id) => {
  const res = await axios.get(`/blog/${id}`);
  return res.data;
};

export const createBlog = async (formData) => {
  const res = await axios.post('/blog', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateBlog = async (id, formData) => {
  const res = await axios.put(`/blog/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await axios.delete(`/blog/${id}`);
  return res.data;
};

export const addComment = async (blogId, content) => {
  const res = await axios.post(`/blog/${blogId}/comment`, { content });
  return res.data;
};
