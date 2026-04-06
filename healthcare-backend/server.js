const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const healthRoutes = require("./routes/heathRoutes");
const authRoutes = require("./routes/authRoutes.js")
const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/", healthRoutes);
app.use("/api/auth", authRoutes)
app.get("/", (req, res) => {
  res.send("Api is running Succesfully");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})