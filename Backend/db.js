const mongoose = require('mongoose');
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async()=>{
  try {
    await mongoose.connect("mongodb+srv://ctech1699:ehsan2006@cluster0.npmlqlc.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected To MongoDb")

  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToMongo;