// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {createError} = require("../utils/createError");
const {asyncWrapper} = require("../utils/asyucWrapper");

exports.protect = asyncWrapper(
    async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log("token",token);
        if (!token)
            return next(createError(401, 'unAuth', 'should loginIn', null));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("asas",decoded)
        req.user = await User.findById(decoded.id)//.select('password');
        if (!req.user) {
            return next(createError(401, 'unAuth', 'غير مسموح للوصول', null));
        }
        if (req.user.role === 'student' && !req.user.hasPaidFees) {
            return next(createError(403, 'forbidden', 'يجب دفع الرسوم للوصول إلى هذه الصفحة', null));
        }
        next()

    });


exports.checkRole = (roles) => (req, res, next) => {
    if (typeof roles === 'string') roles = [roles];
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({message: 'غير مسموح لهذه العملية'});
    }
    next();
};
