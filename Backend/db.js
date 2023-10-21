const mongoose = require('mongoose');
const connectToMongo = async()=>{
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test_app   ');
    console.log("Connected To MongoDb")

  } catch (error) {
    console.log(error)
  }
}

module.exports = connectToMongo;