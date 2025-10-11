import React, { useState } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ThreeDPage from "./pages/ThreeDPage.jsx";
import "./styles.css";

function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCartByIndex = (index) => setCart(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const router = createBrowserRouter([
    // Home
    {
      path: "/",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <Home />
          <Footer />
        </>
      ) : (
        <Navigate to="/register" />
      ),
    },
    // Products & Details
    {
      path: "/products",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <Products addToCart={addToCart} />
          <Footer />
        </>
      ) : <Navigate to="/login" />,
    },
    {
      path: "/products/:id",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <ProductDetails addToCart={addToCart} />
          <Footer />
        </>
      ) : <Navigate to="/login" />,
    },
    // Cart & Checkout
    {
      path: "/cart",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <Cart cart={cart} onRemoveIndex={removeFromCartByIndex} />
          <Footer />
        </>
      ) : <Navigate to="/login" />,
    },
    {
      path: "/checkout",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <Checkout cart={cart} clearCart={clearCart} />
          <Footer />
        </>
      ) : <Navigate to="/login" />,
    },
    // 3D Demo Page
    {
      path: "/3d-demo",
      element: token ? (
        <>
          <Navbar cartCount={cart.length} token={token} setToken={setToken} />
          <ThreeDPage />
          <Footer />
        </>
      ) : <Navigate to="/login" />,
    },
    // Authentication
    {
      path: "/register",
      element: token ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login setToken={setToken} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
