const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const {protect, checkRole} = require('../middleware/auth');

router.route('/qr')
    .post(protect, checkRole('professor'), attendanceController.createQRCode);//protect, checkRole('professor'),

router.route('/scan')
    .post(protect, checkRole('student'), attendanceController.scanQRCode);//protect, checkRole('student'),

router.route('/:courseId')
    .get(protect,checkRole('professor'), attendanceController.getAttendanceByCourse);//protect, checkRole('professor'),

module.exports = router;
