const mongoose = require("mongoose")
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Succesfully");
  }
  catch (error) {
    console.error("Failed to connect with mongodb:", error.message);
    process.exit(1);
  }

}
module.exports = connectDB;