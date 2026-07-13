const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

//console.log(process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Student Management System Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});