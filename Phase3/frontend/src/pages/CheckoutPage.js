import React, { useState, useEffect } from "react";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter 10-digit phone";
    if (form.address.length < 5) newErrors.address = "Address too short";
    return newErrors;
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const orderData = {
      items: [
        { id: 1, name: "Wireless Headphones", price: 699 }, // dummy cart item
      ],
      customer: form,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("✅ Order response:", data);
      alert("✅ Order submitted successfully!");

      // Reset form
      setForm({ name: "", email: "", phone: "", address: "" });

      // Fetch latest orders
      fetchOrders();
    } catch (error) {
      console.error("❌ Error submitting order:", error);
      alert("❌ Failed to place order. Check backend server.");
    }
  };

  // Fetch orders from backend (JSON endpoint)
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders/json");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="checkout-form" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div>
          <label>Address:</label>
          <textarea name="address" value={form.address} onChange={handleChange}></textarea>
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <button type="submit">Place Order</button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h2>📦 All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <strong>Order ID:</strong> {order.id} <br />
                <strong>Name:</strong> {order.customer.name} <br />
                <strong>Email:</strong> {order.customer.email} <br />
                <strong>Phone:</strong> {order.customer.phone} <br />
                <strong>Address:</strong> {order.customer.address} <br />
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;