import React, { useState } from "react";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter 10-digit phone number";
    if (form.address.length < 5) newErrors.address = "Address too short";
    return newErrors;
  };

  // ✅ Submit order (only sends to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSuccessMsg("");

    const orderData = {
      items: [{ id: 1, name: "Wireless Headphones", price: 699 }], // sample item
      customer: form,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(`✅ Order #${data.order?.id || "N/A"} placed successfully!`);
        setForm({ name: "", email: "", phone: "", address: "" });
      } else {
        alert("❌ Failed to place order: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("❌ Failed to place order. Check backend server.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>

      {successMsg && <p style={styles.success}>{successMsg}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.phone && <p style={styles.error}>{errors.phone}</p>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Address:</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            style={styles.textarea}
          />
          {errors.address && <p style={styles.error}>{errors.address}</p>}
        </div>

        <button type="submit" style={styles.button}>
          Place Order
        </button>
      </form>
    </div>
  );
};

// ✅ Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f8f9fa",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  success: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    resize: "none",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
  },
  button: {
    padding: "10px 20px",
    background: "linear-gradient(to right, #007bff, #6610f2)",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default CheckoutPage;