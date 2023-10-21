const mongoose = require("mongoose")

const marksSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true,
    },
    fullmarks:{
        type:Number,
        required:true,
    },
}, { timestamps: true })

const Marks = mongoose.model("Marks",marksSchema)

module.exports = Marks
