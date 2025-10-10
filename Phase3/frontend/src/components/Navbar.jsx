import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/classicshop-logo.jpg"; // import logo

const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="Classic Shop Logo" height="50" />
      </Link>

      {/* Navigation links */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;