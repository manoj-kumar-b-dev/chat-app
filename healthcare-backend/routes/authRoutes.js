const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.js")
const router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, emergencyContacts } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      emergencyContacts
    });
    await newUser.save();
    res.status(201).json({
      message: "User Registered Succesfully",
      user: newUser
    })
  }

  catch (error) {
    res.status(500).json({ message: error.message })
  }
})
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not exist"
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "invalid password"
      })
    }
    const token = jwt.sign(
      { id: user._id },
      "secure@2311",
      { expiresIn: "1d" }
    )
    res.status(200).json({
      message: "login succesfull",
      token
    })
  }
  catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }

})
module.exports = router
