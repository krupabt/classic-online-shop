import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to ClassicShop</h1>
      <p>“Smart gadgets, smarter shopping – all in one place”</p>

      {/* Buttons */}
      <div style={{ margin: "20px 0" }}>
        <Link to="/products">
          <button className="shop-btn">Shop Now</button>
        </Link>
        <Link to="/3d-demo">
          <button className="shop-btn" style={{ marginLeft: "10px" }}>
            View 3D Model
          </button>
        </Link>
      </div>

      {/* Why Shop With Us Section */}
      <div className="why-shop">
        <div className="why-card">
          <span>🚚</span>
          <h3>Free Delivery</h3>
        </div>
        <div className="why-card">
          <span>💳</span>
          <h3>Secure Payments</h3>
        </div>
        <div className="why-card">
          <span>⭐</span>
          <h3>Top Quality</h3>
        </div>
        <div className="why-card">
          <span>📞</span>
          <h3>24/7 Support</h3>
        </div>
      </div>
    </div>
  );
}
