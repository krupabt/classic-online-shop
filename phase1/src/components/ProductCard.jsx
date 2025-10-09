import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      {/* Product Image */}
      <img src={`/images/${product.image}`} alt={product.name} className="product-image" />

      {/* Product Name */}
      <h3>{product.name}</h3>

      {/* Product Description */}
      <p className="description">{product.description}</p>

      {/* Product Price */}
      <p>₹{product.price}</p>

      {/* View Details Button */}
      <Link to={`/products/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
