const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ================= PRODUCTS ================= //
let products = [
  { id: 1, name: "Wireless Headphones", description: "High-quality wireless headphones with noise cancellation and long battery life.", price: 699, image: "Wireless Headphones.webp" },
  { id: 2, name: "Smart Watch", description: "Stylish smartwatch with fitness tracking, heart rate monitor, and notifications.", price: 599, image: "Smart Watch.jpg" },
  { id: 3, name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with deep bass and 12 hours of playtime.", price: 999.99, image: "Bluetooth Speaker.jpg" },
  { id: 4, name: "Digital Camera", description: "Compact digital camera with 20MP resolution and 4K video recording.", price: 2500.99, image: "Digital Camera.jpg" },
  { id: 5, name: "Gaming Mouse", description: "Ergonomic gaming mouse with customizable buttons and RGB lighting.", price: 490.99, image: "Gaming Mouse.webp" },
  { id: 6, name: "Laptop Backpack", description: "Durable and water-resistant backpack with padded laptop compartment.", price: 1999.99, image: "Laptop Backpack.webp" },
  { id: 7, name: "Smartphone", description: "Latest 5G smartphone with AMOLED display and 128GB storage.", price: 15999, image: "Smartphone.jpg" },
  { id: 8, name: "Tablet", description: "Lightweight tablet with 10-inch display, ideal for reading and movies.", price: 12999, image: "Tablet.jpg" },
  { id: 9, name: "Gaming Keyboard", description: "Mechanical gaming keyboard with RGB backlight and fast response keys.", price: 2999, image: "Gaming Keyboard.jpg" },
  { id: 10, name: "Drone", description: "Quadcopter drone with HD camera and 30 minutes flight time.", price: 8999, image: "Drone.jpg" },
  { id: 11, name: "Smart TV", description: "50-inch 4K Ultra HD Smart TV with built-in streaming apps.", price: 35999, image: "Smart TV.jpg" },
  { id: 12, name: "Power Bank", description: "10000mAh fast-charging power bank with dual USB ports.", price: 1499, image: "Power Bank.jpg" },
  { id: 13, name: "Wireless Charger", description: "Fast wireless charging pad compatible with all Qi-enabled devices.", price: 1299, image: "Wireless Charger.jpg" },
  { id: 14, name: "Smart Ceiling Fan", description: "Energy-efficient ceiling fan with remote control and smart home compatibility.", price: 8099, image: "Smart Fan.jpg" }
];

// ================= ORDERS (Persistent Storage) ================= //
const ordersFile = path.join(__dirname, "orders.json");

// ✅ Ensure the orders.json file exists
if (!fs.existsSync(ordersFile)) {
  fs.writeFileSync(ordersFile, "[]", "utf8");
  console.log("🆕 Created new orders.json file");
}

// ✅ Load existing orders
let orders = JSON.parse(fs.readFileSync(ordersFile, "utf8"));

// ✅ Helper function to save orders to file
function saveOrders() {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), "utf8");
  console.log("💾 Orders saved to file");
}

// ================= ROUTES ================= //

// Welcome route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Classic Shop Backend 🚀</h1>");
});

// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ Add a new order
app.post("/orders", (req, res) => {
  const { items, customer } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  if (!customer || !customer.name || !customer.email || !customer.phone || !customer.address) {
    return res.status(400).json({ error: "Customer details are required" });
  }

  const newOrder = {
    id: Date.now(),
    items,
    customer,
    createdAt: new Date().toLocaleString(),
  };

  orders.push(newOrder);
  saveOrders();

  res.status(201).json({ message: "✅ Order submitted successfully!", order: newOrder });
});

// ✅ Route 1: Show all orders as HTML (for browser)
app.get("/orders", (req, res) => {
  if (orders.length === 0) {
    return res.send("<h2>No orders found yet 🚀</h2>");
  }

  let html = `
    <h2>🧾 Orders List</h2>
    <ul style="list-style:none;padding:0">
  `;

  orders.forEach(order => {
    html += `
      <li style="margin:15px 0;padding:10px;border:1px solid #ccc;border-radius:10px;">
        <b>Order ID:</b> ${order.id}<br/>
        <b>Customer:</b> ${order.customer.name} (${order.customer.email}, ${order.customer.phone})<br/>
        <b>Address:</b> ${order.customer.address}<br/>
        <b>Items:</b> ${order.items.map(i => i.name).join(", ")}<br/>
        <b>Date:</b> ${order.createdAt}
      </li>
    `;
  });

  html += "</ul>";
  res.send(html);
});

// ✅ Route 2: Show all orders as JSON (for React frontend)
app.get("/orders/json", (req, res) => {
  res.json(orders);
});

// ================= START SERVER ================= //
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});