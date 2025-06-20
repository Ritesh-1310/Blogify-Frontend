import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('http://localhost:8002/api/blog');
      const data = await res.json();
      setPosts(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="px-10 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts.map(post => (
        <div key={post._id} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-[320px]">
          <img
            src={post.coverImageURL}
            alt={post.title}
            className="h-52 w-full object-cover rounded-t-xl"
          />
          <div className="p-4 flex flex-col justify-between flex-1">
            <h3 className="font-bold text-xl mb-3 line-clamp-2">{post.title}</h3>
            <Link
              to={`/blog/${post._id}`}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded text-sm self-start hover:bg-blue-700"
            >
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
