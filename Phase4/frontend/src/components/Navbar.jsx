import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/classicshop-logo.jpg";

const Navbar = ({ cartCount, token, setToken }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT
    setToken(""); // Update App state
    navigate("/login"); // Redirect to login
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1976d2",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="Classic Shop Logo" height="50" />
      </Link>

      {/* Navigation links */}
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0 }}>
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        </li>
        <li>
          <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>Products</Link>
        </li>
        <li>
          <Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
            Cart ({cartCount})
          </Link>
        </li>

        {/* Conditional links */}
        {!token ? (
          <>
            <li>
              <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
                Login
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#f44336",
                border: "none",
                padding: "8px 12px",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;