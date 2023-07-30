const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MONGODB_URI);
//connecting to a external database is an async function
//instance of a mongoDB is to be created
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connection made. ${conn.connection.host}`);
  } catch (error) {
    console.log('Error:', error);
  }
}

module.exports = connectDB;
