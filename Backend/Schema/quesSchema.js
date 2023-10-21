const mongoose = require("mongoose")

const QuesSchema = new mongoose.Schema({
    quesTitle: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    options: [{
        text: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        }
    }],
    subject: {
        type: String,
        required: true,
    },
    chapter: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Ques = mongoose.model("Ques", QuesSchema)

module.exports = Ques
