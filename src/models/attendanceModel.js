const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true},
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true},
    sessionIdentifier: {
        type: String,
        required: true
    },
    attendedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
