const mongoose = require("mongoose");

const MONGO_URI = "mongodb://localhost:27017/notes_db";

const connectDB = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully at", MONGO_URI);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });
};

module.exports = connectDB;
