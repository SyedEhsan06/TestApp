const mongoose = require('mongoose');
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async()=>{
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected To MongoDb")

  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToMongo;