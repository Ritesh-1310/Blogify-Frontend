import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api/blog";

const AddBlog = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("title", title);
      formData.append("body", body);
      await createBlog(formData);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Blog creation failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 border rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold hover:file:bg-blue-100"
          />
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="mt-4 w-full h-[450px] object-cover rounded border"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows="8"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
