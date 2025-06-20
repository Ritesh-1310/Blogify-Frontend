import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import BlogDetail from "./pages/BlogDetail";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog"; 
import { AuthProvider } from "./context/AuthContext"; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Navbar shows on all pages */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
