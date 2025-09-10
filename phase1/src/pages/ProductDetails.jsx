import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        {/* ✅ Fixed dynamic image path */}
        <img src={`/images/${product.image}`} alt={product.name} />

        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>₹{product.price}</h3>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
