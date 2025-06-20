import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // using API function
      setUser(null);
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-10 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Blogify</Link>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline text-lg">Home</Link>
        {user && <Link to="/add-blog" className="hover:underline text-lg">Add Blog</Link>}

        {user ? (
          <div ref={dropdownRef} className="relative text-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDropdownVisible(prev => !prev);
              }}
              className="hover:underline"
            >
              {user.name?.split(" ")[0] || user.fullName?.split(" ")[0]} ▾
            </button>

            {dropdownVisible && (
              <div className="absolute right-0 mt-2 bg-white text-black p-2 rounded shadow z-10 w-32">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="hover:underline text-lg">Create Account</Link>
            <Link to="/signin" className="hover:underline text-lg">Signin</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
