const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('⏳ Connecting to MongoDB...');
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB;
