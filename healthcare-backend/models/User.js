const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "customer"
  },
  emergencyContacts: [{
    name: String,
    phone: String
  }]
}, {
  timestamps: true
})
const User = mongoose.model("Users", userSchema)
module.exports = User
