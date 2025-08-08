const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/inotebook"; 

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.log("❌ Failed to connect to MongoDB");
  }
  
}; 

module.exports = connectToMongo;

