import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`http://localhost:8002/api/blog/${id}`);
      const data = await res.json();
      setBlog(data.blog);
      setComments(data.comments);
    };
    fetchBlog();
  }, [id]);

  const handleAddComment = async () => {
    const res = await fetch(`http://localhost:8002/api/blog/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: comment }),
    });
    const newComment = await res.json();
    setComments((prev) => [...prev, newComment]);
    setComment("");
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await fetch(`http://localhost:8002/api/blog/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      navigate("/");
    } else {
      const err = await res.json();
      alert(err.message || "Failed to delete blog");
    }
  };

  if (!blog) return <p>Loading...</p>;

  const isAuthor = user && blog.createdBy?._id === user._id;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <img src={blog.coverImageURL} alt={blog.title} className="w-full h-[600px] object-cover rounded mb-4" />
      <p className="text-lg text-gray-700 mb-6 font-serif whitespace-pre-line">{blog.body}</p>

      <div className="flex items-center gap-2 mb-6">
        <img src="/images/default_user.png" alt="user" className="w-8 h-8 rounded-full" />
        <span>{blog.createdBy?.fullName}</span>
      </div>

      {isAuthor && (
        <div className="flex gap-4 mb-6">
          <button onClick={() => navigate(`/edit-blog/${blog._id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded">
            Edit Blog
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete Blog
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Comments ({comments.length})</h2>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your comment"
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={handleAddComment} className="bg-blue-600 text-white px-3 py-1 rounded">
          Add Comment
        </button>
        <div className="mt-4">
          {comments.map((c) => (
            <p key={c._id} className="text-sm py-1 border-b">
              {c.createdBy?.fullName}: {c.content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
