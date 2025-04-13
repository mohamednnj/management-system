const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: String
});

module.exports = mongoose.model('Course', courseSchema);
