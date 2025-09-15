import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx"; // Import Home component
import { Route, Routes } from "react-router-dom";
import Collection from "./pages/Collection.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UploadProduct from "./components/UploadProduct.jsx";
import About from "./pages/about.jsx";


import AdminRoute from "./components/AdminRoute";

function App() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
      <Toaster />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About/>} />
      <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Dashboard Route */}

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/add-product" element={<UploadProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
