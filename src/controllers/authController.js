// src/controllers/authController.js
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
    return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

exports.register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({message: 'البريد الالكتروني مستخدم بالفعل'});

        const newUser = await User.create({name, email, password, role});
        const token = generateToken(newUser);

        res.status(201).json({
            message: 'تم التسجيل بنجاح',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'حدث خطأ أثناء التسجيل'});
    }
};

// تسجيل الدخول
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            console.log(email);
            return res.status(400).json({message: 'email بيانات غير صحيحة'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({message: 'بيانات غير صحيحة'});

        const token = generateToken(user);
        res.status(200).json({
            message: 'تم تسجيل الدخول بنجاح',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'حدث خطأ أثناء تسجيل الدخول'});
    }
};
