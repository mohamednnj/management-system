// src/routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');
const {protect, checkRole} = require('../middleware/auth');

router.route('/')
    .post(protect, checkRole('professor'), examController.createExam);//protect, checkRole('professor'),

// تقديم الاختبار (للطالب، مع التحقق من التسجيل في المادة باستخدام Middleware إضافي مثل checkEnrollment)
router.route('/:id/submit')
    .post(protect, checkRole('student'), examController.submitExam);//protect, checkRole('student'),

module.exports = router;
