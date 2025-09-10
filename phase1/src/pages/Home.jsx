import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Welcome to ClassicShop</h1>
      <p>Your one-stop shop for fashion, gadgets, and more.</p>
      <Link to="/products">
        <button className="shop-btn">Shop Now</button>
      </Link>

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

export default Home;
