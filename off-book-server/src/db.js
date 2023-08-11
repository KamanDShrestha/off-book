const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MONGODB_URI);

//connecting to a external database is an async function
//instance of a mongoDB is to be created
async function connectDB() {
  //for ensuring that Node.js works smoothly while working externally
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      connectionParams
    );
    console.log(`Connection made. ${conn.connection.host}`);
  } catch (error) {
    console.log('Error:', error);
  }
}

module.exports = connectDB;
