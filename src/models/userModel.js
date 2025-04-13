const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grades: [{
        subject: {
            type: String,
            // required: true
        },
        score: {
            type: Number,
            // required: true
        },
        creditHours: {
            type: Number,
            // required: true
        }
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'professor', 'TA', 'staff', 'guest'],
        default: 'student'
    },
    hasPaidFees: {
        type: Boolean,
        default: true
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS, 10) : 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', userSchema);
