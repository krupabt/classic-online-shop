import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch products from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("⚠ Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default Products;