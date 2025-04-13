// src/models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date
        , required: true,
       default: function () {
            return new Date(this.startTime.getTime() + 15 * 60 * 1000);
        }
    },
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Exam', examSchema);
