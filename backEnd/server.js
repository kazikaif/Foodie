require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  Username: String,
  Email: String,
  Phone: String,
  Password: String,
  role: { type: String, default: "client" }
});
const User = mongoose.model("User", userSchema, "users");

// ✅ Delivery Schema
const deliverySchema = new mongoose.Schema({
  Username: String,
  Email: String,
  Phone: String,
  Password: String,
  VehicleNumber: String,
  DLNumber: String,
  role: { type: String, default: "delivery" }
});
const Delivery = mongoose.model("Delivery", deliverySchema, "Dmen");

// ✅ Admin Schema
const adminSchema = new mongoose.Schema({
  Username: String,
  Email: String,
  Phone: String,
  Password: String,
  role: { type: String, default: "admin" }
});
const Admin = mongoose.model("Admin", adminSchema, "Admin");

// ✅ Middleware for Auth
function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ message: "Access Denied" });

  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No Token Provided" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res.status(400).json({ message: "Invalid Token" });
  }
}

// ✅ SIGNUP Route
app.post("/signup", async (req, res) => {
  try {
    const { Username, Email, Phone, Password, role, VehicleNumber, DLNumber } = req.body;

    if (!Username || !Email || !Phone || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const userRole = (role || "client").toLowerCase();

    if (userRole === "delivery") {
      const newDelivery = new Delivery({
        Username, Email, Phone, Password: hashedPassword,
        VehicleNumber, DLNumber, role: "delivery"
      });
      await newDelivery.save();
      return res.json("Delivery Man Registered Successfully");
    } else if (userRole === "admin") {
      const newAdmin = new Admin({
        Username, Email, Phone, Password: hashedPassword, role: "admin"
      });
      await newAdmin.save();
      return res.json("Admin Registered Successfully");
    } else {
      const newUser = new User({
        Username, Email, Phone, Password: hashedPassword, role: "client"
      });
      await newUser.save();
      return res.json("Client Registered Successfully");
    }
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: "Signup Failed", error: err.message });
  }
});

// ✅ LOGIN Route
app.post("/login", async (req, res) => {
  try {
    const { Username, Password, role } = req.body;
    const userRole = role.toLowerCase();

    if (userRole === "delivery") {
      const user = await Delivery.findOne({ Username });
      if (!user || !(await bcrypt.compare(Password, user.Password))) {
        return res.json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
      return res.json({ message: "Login Successfully", username: user.Username, role: user.role, token });
    }

    if (userRole === "client") {
      const user = await User.findOne({ Username });
      if (!user || !(await bcrypt.compare(Password, user.Password))) {
        return res.json({ message: "Invalid username or password" });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
      return res.json({ message: "Login Successfully", username: user.Username, role: user.role, token });
    }

    if (userRole === "admin") {
      const admin = await Admin.findOne({ Username });
      if (!admin) return res.json({ message: "Invalid Admin Credentials" });

      const isMatch =
        admin.Password === Password || await bcrypt.compare(Password, admin.Password);

      if (!isMatch) return res.json({ message: "Invalid Admin Credentials" });

      const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET);
      return res.json({
        message: "Login Successfully",
        role: "admin",
        token,
        admin: { Username: admin.Username, Email: admin.Email, Phone: admin.Phone }
      });
    }

  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Client User Profile
app.get("/clientuser", auth, async (req, res) => {
  try {
    if (req.user.role !== "client") return res.status(403).json({ message: "Forbidden" });
    const user = await User.findById(req.user.id).select("-Password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("❌ Client Profile Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Delivery User Profile
app.get("/deliveryuser", auth, async (req, res) => {
  try {
    if (req.user.role !== "delivery") return res.status(403).json({ message: "Forbidden" });
    const delivery = await Delivery.findById(req.user.id).select("-Password");
    if (!delivery) return res.status(404).json({ message: "Delivery user not found" });
    res.json(delivery);
  } catch (err) {
    console.error("❌ Delivery Profile Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Admin User Profile
app.get("/adminuser", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const adminData = await Admin.findById(req.user.id).select("-Password");
    if (!adminData) return res.status(404).json({ message: "Admin not found" });
    res.json(adminData);
  } catch (err) {
    console.error("❌ Admin Profile Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Admin Only Routes
app.get("/getAllUsers", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const users = await User.find({});
  res.json(users);
});

app.get("/getAllDelivery", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  const delivery = await Delivery.find({});
  res.json(delivery);
});

app.delete("/deleteUser/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

app.delete("/deleteDelivery/:id", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  await Delivery.findByIdAndDelete(req.params.id);
  res.json({ message: "Delivery Man deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
