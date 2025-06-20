/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, fetchProfile } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setDropdownVisible(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:8002/api/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-900 text-white px-10 py-3 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">Blogify</h1> */}
      <Link to="/" className="text-xl font-bold">Blogify</Link>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline text-lg">Home</Link>
        {user && <Link to="/add-blog" className="hover:underline text-lg">Add Blog</Link>}

        {user ? (
          <div className="relative text-lg">
            <button onClick={(e) => { e.stopPropagation(); setDropdownVisible(prev => !prev); }}>
              {user.name.split(" ")[0]} ▾
            </button>
            {dropdownVisible && (
              <div onClick={(e) => e.stopPropagation()} className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow z-10">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="hover:underline">Create Account</Link>
            <Link to="/signin" className="hover:underline">Signin</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
