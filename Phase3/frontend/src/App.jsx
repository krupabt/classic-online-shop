// src/App.jsx
import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./styles.css";

function App() {
  const [cart, setCart] = useState([]);

  // ✅ Add item to cart
  const addToCart = (product) => setCart((prev) => [...prev, product]);

  // ✅ Remove item from cart by index
  const removeFromCartByIndex = (indexToRemove) =>
    setCart((prev) => prev.filter((_, i) => i !== indexToRemove));

  // ✅ Clear cart after successful checkout
  const clearCart = () => setCart([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Home addToCart={addToCart} />
          <Footer />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Products addToCart={addToCart} />
          <Footer />
        </>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <ProductDetails addToCart={addToCart} />
          <Footer />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          <Cart cart={cart} onRemoveIndex={removeFromCartByIndex} />
          <Footer />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <Navbar cartCount={cart.length} />
          {/* ✅ Passing cart + clearCart */}
          <Checkout cart={cart} clearCart={clearCart} />
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;